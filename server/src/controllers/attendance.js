import Attendance from "../models/attendance.js";
import Department from "../models/department.js";
import Employee from "../models/employee.js";
import { catchErrors } from "../utils/index.js";
import { myCache } from "../index.js";

const getAttendanceList = catchErrors(async (req, res) => {
  const { department } = req.query;

  if (!department) throw new Error("Please provide department to get sheet");

  const employees = await Employee.find({ department }).select(
    "name employeeId"
  );

  return res.status(201).json({
    success: true,
    message: "Attendance list fetched successfully",
    employees,
  });
});

const markAttendance = catchErrors(async (req, res) => {
  const { attendanceRecords } = req.body;

  if (!attendanceRecords || attendanceRecords.length === 0)
    throw new Error("Please provide valid attendance records");

  const attendance = attendanceRecords.map(({ employee, date, status }) => {
    return { employee, date, status };
  });

  await Attendance.insertMany(attendance);

  myCache.del("insights");

  return res.status(201).json({
    success: true,
    message: "Attendance marked successfully",
  });
});

const getEmployeeAttendance = catchErrors(async (req, res) => {
  const { employeeID } = req.params;

  if (!employeeID) throw new Error("Please provide employee id ");

  const attendanceRecord = await Attendance.find({ employee: employeeID });

  if (!attendanceRecord || attendanceRecord.length === 0)
    throw new Error("No attendance records found");

  const totalDays = attendanceRecord.length;
  const presentDays = attendanceRecord.filter(
    (record) => record.status === "Present"
  ).length;
  const attendancePercentage = (presentDays / totalDays) * 100;

  return res.status(201).json({
    success: true,
    message: "Attendance fetched successfully",
    attendancePercentage: attendancePercentage.toFixed(2),
    attendanceRecord,
  });
});

const getEmployeesAttendancePercentage = catchErrors(async (req, res) => {
  const attendanceRecords = await Attendance.find();

  if (!attendanceRecords || attendanceRecords.length === 0)
    throw new Error("No attendance records found");

  const employeeAttendancePercentage = {};

  attendanceRecords.forEach((record) => {
    const { employee, status } = record;

    if (!employeeAttendancePercentage[employee]) {
      employeeAttendancePercentage[employee] = { totalDays: 0, presentDays: 0 };
    }

    employeeAttendancePercentage[employee].totalDays += 1;

    if (status === "present") {
      employeeAttendancePercentage[employee].presentDays += 1;
    }
  });

  const attendancePercentageResults = Object.keys(
    employeeAttendancePercentage
  ).map((employeeId) => {
    const { totalDays, presentDays } = employeeAttendancePercentage[employeeId];
    const percentage = (presentDays / totalDays) * 100;
    return { employeeId, attendancePercentage: percentage.toFixed(2) };
  });

  return res.status(200).json({
    success: true,
    message: "Attendance percentages fetched successfully",
    attendancePercentageResults,
  });
});

const getDepartmentAttendancePercentage = async () => {
  try {
    const departments = await Department.find();
    if (departments.length === 0) {
      throw new Error("No departments found.");
    }

    const departmentAttendance = [];

    for (const department of departments) {
      const departmentId = department._id;

      const employees = await Employee.find({ department: departmentId });

      if (employees.length === 0) {
        departmentAttendance.push({
          department: department.name,
          totalEmployees: 0,
          presentCount: 0,
          attendancePercentage: "N/A",
        });
        continue;
      }

      const attendanceRecords = await Attendance.aggregate([
        {
          $match: {
            employee: { $in: employees.map((e) => e._id) },
            status: "Present",
          },
        },
        {
          $group: {
            _id: "$employee",
            count: { $sum: 1 },
          },
        },
      ]);

      const presentCount = attendanceRecords.length;
      const totalEmployees = employees.length;
      const attendancePercentage = (
        (presentCount / totalEmployees) *
        100
      ).toFixed(2);

      departmentAttendance.push({
        department: department.name,
        totalEmployees,
        presentCount,
        attendancePercentage: `${attendancePercentage}%`,
      });
    }

    return departmentAttendance;
  } catch (error) {
    console.error(error.message);
  }
};

export {
  getAttendanceList,
  markAttendance,
  getEmployeeAttendance,
  getEmployeesAttendancePercentage,
  getDepartmentAttendancePercentage,
};
