import Employee from "../models/employee.js";
import Department from "../models/department.js";
import Role from "../models/role.js";
import { catchErrors } from "../utils/index.js";
import { getDepartmentAttendancePercentage } from "./attendance.js";
import { myCache } from "../utils/index.js";

const getInsights = catchErrors(async (req, res) => {
  const cacheKey = 'insights'; 

  const cachedInsights = myCache.get(cacheKey);
  if (cachedInsights) {
    return res.status(200).json({
      success: true,
      message: 'Insights fetched successfully (from cache)',
      insights: cachedInsights,
    });
  }

  const totalEmployees = await Employee.countDocuments();
  const totalDepartments = await Department.countDocuments();
  const totalRoles = await Role.countDocuments();
  const departmentAttandancePercent = await getDepartmentAttendancePercentage();
  const totalMaleEmployees = await Employee.countDocuments({ gender: 'Male' });

  const insights = {
    totalEmployees,
    totalDepartments,
    totalRoles,
    totalMaleEmployees,
    totalFemaleEmployees: totalEmployees - totalMaleEmployees,
    departmentAttandancePercent,
  };

  myCache.set(cacheKey, insights);

  return res.status(201).json({
    success: true,
    message: 'Insights fetched successfully',
    insights,
  });
});


export { getInsights };
