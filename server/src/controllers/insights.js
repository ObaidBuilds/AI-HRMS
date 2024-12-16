import Employee from "../models/employee.js";
import Department from "../models/department.js";
import Role from "../models/role.js";
import { catchErrors } from "../utils/index.js";
import { getDepartmentAttendancePercentage } from "./attendance.js";

const getInsights = catchErrors(async (req, res) => {
  const totalEmployees = await Employee.countDocuments();
  const totalDepartments = await Department.countDocuments();
  const totalRoles = await Role.countDocuments();
  const departmentAttandancePercent = await getDepartmentAttendancePercentage();
  const totalMaleEmployees = await Employee.countDocuments({ gender: "Male" });

  // Attendance percentage by department;

  return res.status(201).json({
    success: true,
    message: "Inshights fetched successfuly",
    insights: {
      totalEmployees,
      totalDepartments,
      totalRoles,
      totalMaleEmployees,
      totalFemaleEmployees: totalEmployees - totalMaleEmployees,
      departmentAttandancePercent,
    },
  });
});

export { getInsights };
