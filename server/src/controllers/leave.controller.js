import Employee from "../models/employee.model.js";
import Leave from "../models/leave.model.js";
import { catchErrors, myCache } from "../utils/index.js";
import { getSubstitute } from "../predictions/index.js";
import { notifySubstituteEmployee } from "../templates/index.js";

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

  const leave = await Leave.findById(id);

  if (!leave) throw new Error("Leave not found");
  if (leave.status.toLowerCase() === "rejected")
    throw new Error("Leave already rejected");
  if (!status) throw new Error("Leave status is required");

  if (status.toLowerCase() === "rejected") {
    leave.status = "Rejected";
    if (remarks) leave.remarks = remarks;
    await leave.save();
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
      leave.remarks = `${leave.duration} days deducted from leave balance.`;
    } else {
      leave.remarks = `Pay deducted for ${leave.duration} days.`;
    }

    const substituteData = await getSubstitute({
      department: employee.department,
      shift: employee.shift,
    });

    if (substituteData.availability) {
      const formattedToDate = new Date(leave.toDate)
        .toISOString()
        .split("T")[0];
      const formattedFromDate = new Date(leave.fromDate)
        .toISOString()
        .split("T")[0];

      leave.substitute = substituteData.id;

      await notifySubstituteEmployee({
        email: substituteData.email,
        subsName: substituteData.name,
        name: employee.name,
        shift: employee.shift,
        department: employee.department.name,
        toDate: formattedToDate,
        fromDate: formattedFromDate,
        duration: leave.duration,
      });
    }

    await leave.save();
    await employee.save();

    myCache.del("insights");

    return res.status(200).json({
      success: true,
      message: "Leave approved successfully",
      leave,
    });
  }

  throw new Error("Invalid leave status provided");
});

export { getLeaves, applyLeave, respondLeave, getEmployeesOnLeave };
