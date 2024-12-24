import Employee from "../models/employee.js";
import Department from "../models/department.js";
import Role from "../models/role.js";
import Leave from "../models/leave.js";
import { catchErrors } from "../utils/index.js";
import { getDepartmentAttendancePercentage } from "./attendance.js";
import { myCache } from "../utils/index.js";

const getInsights = catchErrors(async (req, res) => {
  const cacheKey = "insights";

  const cachedInsights = myCache.get(cacheKey);
  if (cachedInsights) {
    return res.status(200).json({
      success: true,
      message: "Insights fetched successfully (from cache)",
      insights: cachedInsights,
    });
  }

  const totalEmployees = await Employee.countDocuments();
  const totalDepartments = await Department.countDocuments();
  const totalRoles = await Role.countDocuments();
  const departmentAttandancePercent = await getDepartmentAttendancePercentage();
  const totalMaleEmployees = await Employee.countDocuments({ gender: "Male" });
  const pendingLeaves = await Leave.find({
    status: "Pending",
  }).countDocuments();
  const formattedDate = new Date();
  const employeesOnLeave = await Leave.find({
    status: "Approved",
    $or: [
      { fromDate: { $lte: formattedDate }, toDate: { $gte: formattedDate } },
      { fromDate: { $lte: formattedDate }, toDate: null },
    ],
  }).countDocuments();

  const insights = {
    totalEmployees,
    totalDepartments,
    totalRoles,
    pendingLeaves,
    employeesOnLeave,
    totalMaleEmployees,
    totalFemaleEmployees: totalEmployees - totalMaleEmployees,
    departmentAttandancePercent,
  };

  myCache.set(cacheKey, insights);

  return res.status(201).json({
    success: true,
    message: "Insights fetched successfully",
    insights,
  });
});

export { getInsights };
