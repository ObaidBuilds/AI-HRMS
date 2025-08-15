import Leave from "../models/leave.model.js";
import Payroll from "../models/payroll.model.js";
import Employee from "../models/employee.model.js";
import { getSubstitute } from "../predictions/index.js";
import { catchErrors, formatDate, myCache } from "../utils/index.js";
import { leaveRespond, notifySubstituteEmployee } from "../templates/index.js";

const getLeaves = catchErrors(async (req, res) => {
  const { status = "pending" } = req.query;

  const leaves = await Leave.find({ status: { $regex: status, $options: "i" } })
    .populate({
      path: "employee",
      select: "name employeeId department role",
      populate: [
        { path: "department", select: "name" },
        { path: "role", select: "name" },
      ],
    })
    .populate({
      path: "substitute",
      select: "name department role",
      populate: [
        { path: "department", select: "name" },
        { path: "role", select: "name" },
      ],
    });

  return res.status(200).json({
    success: true,
    message: "Leaves fetched successfully",
    leaves,
  });
});

const getEmployeesOnLeave = catchErrors(async (req, res) => {
  const { date } = req.query;

  const formattedDate = new Date(date);

  const leaves = await Leave.find({
    status: "Approved",
    $or: [
      { fromDate: { $lte: formattedDate }, toDate: { $gte: formattedDate } },
      { fromDate: { $lte: formattedDate }, toDate: null },
    ],
  })
    .populate({
      path: "employee",
      select: "name employeeId department role",
      populate: [
        {
          path: "department",
          select: "name",
        },
        {
          path: "role",
          select: "name",
        },
      ],
    })
    .populate("substitute", "name");

  return res.status(200).json({
    success: true,
    message: "Leaves fetched successfully",
    leaves,
  });
});

const applyLeave = catchErrors(async (req, res) => {
  const employee = req.user;
  const { leaveType, duration, fromDate, toDate } = req.body;

  if (!employee || !leaveType || !fromDate || !toDate)
    throw new Error("All fields are required");

  const leave = await Leave.create({
    employee,
    leaveType,
    fromDate,
    toDate,
    duration,
    status: "Pending",
  });

  myCache.del("insights");

  return res.status(201).json({
    success: true,
    message: "Leave applied successfully",
    leave,
  });
});

const rejectLeave = async (leave, remarks) => {
  leave.status = "Rejected";
  if (remarks) leave.remarks = remarks;
  await leave.save();

  await leaveRespond({
    email: leave.employee.email,
    name: leave.employee.name,
    type: leave.leaveType,
    status: leave.status,
  });

  return {
    success: true,
    message: "Leave rejected successfully",
    leave,
  };
};

const deductFromLeaveBalance = (employee, duration) => {
  const daysFromBalance = Math.min(employee.leaveBalance, duration);
  const daysFromSalary = duration - daysFromBalance;

  if (daysFromBalance > 0) {
    employee.leaveBalance -= daysFromBalance;
  }

  return { daysFromBalance, daysFromSalary };
};

const deductFromSalary = async (
  employeeId,
  fromDate,
  days,
  existingRemarks = ""
) => {
  const date = new Date(fromDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const payrollData = await Payroll.findOne({
    employee: employeeId,
    year,
    month,
  });

  const deductionAmount = 1000 * days;
  payrollData.deductions += deductionAmount;
  payrollData.netSalary -= deductionAmount;
  await payrollData.save();

  return `${existingRemarks}Pay deducted for ${days} days (${deductionAmount.toFixed(
    2
  )}).`;
};

const approveLeave = async (leave, employee) => {
  leave.status = "Approved";

  if (employee.leaveBalance > 0) {
    const { daysFromBalance, daysFromSalary } = deductFromLeaveBalance(
      employee,
      leave.duration
    );

    if (daysFromBalance > 0) {
      leave.remarks = `${daysFromBalance} days deducted from leave balance. `;
    }

    if (daysFromSalary > 0) {
      leave.remarks = await deductFromSalary(
        leave.employee,
        leave.fromDate,
        daysFromSalary,
        leave.remarks
      );
    }
  } else {
    leave.remarks = await deductFromSalary(
      leave.employee,
      leave.fromDate,
      leave.duration
    );
  }

  const substituteData = await getSubstitute({
    department: employee.department,
    shift: employee.shift,
  });

  let subsMsg = "";
  if (substituteData.availability) {
    leave.substitute = substituteData.id;
    subsMsg = "Substitute assigned";

    await notifySubstituteEmployee({
      name: employee.name,
      shift: employee.shift,
      duration: leave.duration,
      email: substituteData.email,
      subsName: substituteData.name,
      toDate: formatDate(leave.toDate),
      department: employee.department.name,
      fromDate: formatDate(leave.fromDate),
    });
  } else {
    subsMsg = "Substitute not found";
  }

  await leave.save();
  await employee.save();

  await leaveRespond({
    email: leave.employee.email,
    name: leave.employee.name,
    type: leave.leaveType,
    status: leave.status,
  });

  myCache.del("insights");

  return {
    success: true,
    message: `Leave approved successfully - ${subsMsg}`,
    leave,
  };
};

const respondLeave = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { remarks, status } = req.body;

  const leave = await Leave.findById(id).populate("employee", "name email");

  if (!leave) throw new Error("Leave not found");

  if (leave.status === "Rejected") throw new Error("Leave already rejected");

  if (!status) throw new Error("Leave status is required");

  if (status === "Rejected") {
    const result = await rejectLeave(leave, remarks);
    return res.status(200).json(result);
  }

  if (status === "Approved") {
    const employee = await Employee.findById(leave.employee).populate(
      "department"
    );
    if (!employee) throw new Error("Employee not found");

    const result = await approveLeave(leave, employee);
    return res.status(200).json(result);
  }
});

const assignSustitute = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { employee } = req.body;

  if (!employee) throw new Error("Substitue required");

  const leave = await Leave.findById(id);
  const substitute = await Employee.findById(employee);

  const isOnLeave = await Leave.findOne({
    employee: substitute._id,
    status: "Approved",
    fromDate: { $lte: leave.toDate },
    toDate: { $gte: leave.fromDate },
  });

  if (isOnLeave)
    throw new Error("Substitute employee is on leave during this period");

  const updatedLeave = await Leave.findByIdAndUpdate(
    id,
    { substitute: employee },
    { new: true }
  )
    .populate({
      path: "employee",
      select: "name employeeId department role shift",
      populate: [
        {
          path: "department",
          select: "name",
        },
        {
          path: "role",
          select: "name",
        },
      ],
    })
    .populate("substitute", "name");

  await notifySubstituteEmployee({
    email: substitute.email,
    duration: leave.duration,
    subsName: substitute.name,
    toDate: formatDate(leave.toDate),
    name: updatedLeave.employee.name,
    shift: updatedLeave.employee.shift,
    fromDate: formatDate(leave.fromDate),
    department: updatedLeave.employee.department.name,
  });

  myCache.del("insights");

  return res.status(201).json({
    success: true,
    message: "Leave applied successfully",
    leave: updatedLeave,
  });
});

const deleteLeave = async (employee) => {
  if (!employee) throw new Error("Please provide employee Id");

  const leave = await Leave.deleteOne({ employee });

  if (leave.deletedCount) return;

  return "Leave deleted successfuly";
};

async function getEmployeeLeaveStatus(employeeId, date = new Date()) {
  const activeLeave = await Leave.findOne({
    employee: employeeId,
    status: "Approved",
    fromDate: { $lte: date },
    toDate: { $gte: date },
  });

  return activeLeave ? "On Leave" : "Active";
}

export {
  getLeaves,
  applyLeave,
  deleteLeave,
  respondLeave,
  assignSustitute,
  getEmployeesOnLeave,
  getEmployeeLeaveStatus,
};
