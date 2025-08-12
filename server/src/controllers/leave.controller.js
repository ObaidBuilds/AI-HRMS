import Leave from "../models/leave.model.js";
import Employee from "../models/employee.model.js";
import { getSubstitute } from "../predictions/index.js";
import { catchErrors, formatDate, myCache } from "../utils/index.js";
import { leaveRespond, notifySubstituteEmployee } from "../templates/index.js";
import Payroll from "../models/payroll.model.js";

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

const respondLeave = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { remarks, status } = req.body;

  const leave = await Leave.findById(id).populate("employee", "name email");

  if (!leave) throw new Error("Leave not found");
  if (leave.status.toLowerCase() === "rejected")
    throw new Error("Leave already rejected");
  if (!status) throw new Error("Leave status is required");

  if (status.toLowerCase() === "rejected") {
    leave.status = "Rejected";
    if (remarks) leave.remarks = remarks;
    await leave.save();
    await leaveRespond({
      email: leave.employee.email,
      name: leave.employee.name,
      type: leave.leaveType,
      status: leave.status.slice(0, 1).toUpperCase() + leave.status.slice(1),
    });
    return res.status(200).json({
      success: true,
      message: "Leave rejected successfully",
      leave,
    });
  }

  if (status.toLowerCase() === "approved") {
    leave.status = "Approved";

    const employee = await Employee.findById(leave.employee).populate(
      "department"
    );

    if (!employee) throw new Error("Employee not found");

    if (employee.leaveBalance >= leave.duration) {
      employee.leaveBalance -= leave.duration;
      leave.remarks = `${leave.duration} days deducted.`;
    } else {
      const fromDate = new Date(leave.fromDate);

      const year = fromDate.getFullYear();

      const month = fromDate.getMonth() + 1;

      const payrollData = await Payroll.findOne({
        employee: leave.employee,
        year,
        month,
      });

      // const dailySalary = payrollData.baseSalary / 30;
      // const deductionAmount = dailySalary * leave.duration;

      const deductionAmount = 1000 * leave.duration;

      payrollData.deductions += deductionAmount;
      payrollData.netSalary -= deductionAmount;

      await payrollData.save();

      leave.remarks = `Pay deducted for ${
        leave.duration
      } days (${deductionAmount.toFixed(2)}.`;
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
        email: substituteData.email,
        subsName: substituteData.name,
        name: employee.name,
        shift: employee.shift,
        department: employee.department.name,
        toDate: formatDate(leave.toDate),
        fromDate: formatDate(leave.fromDate),
        duration: leave.duration,
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
      status: leave.status.slice(0, 1).toUpperCase() + leave.status.slice(1),
    });

    myCache.del("insights");

    return res.status(200).json({
      success: true,
      message: `Leave approved successfully - ${subsMsg}`,
      leave,
    });
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
    subsName: substitute.name,
    name: updatedLeave.employee.name,
    shift: updatedLeave.employee.shift,
    department: updatedLeave.employee.department.name,
    toDate: formatDate(leave.toDate),
    fromDate: formatDate(leave.fromDate),
    duration: leave.duration,
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
