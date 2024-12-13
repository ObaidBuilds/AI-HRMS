import Attendance from "../models/attendance.js";
import { catchErrors } from "../utils/index.js";

const markAttendance = catchErrors(async (req, res) => {
  const { attendanceRecords } = req.body;

  if (!attendanceRecords || attendanceRecords.length === 0)
    throw new Error("Please provide valid attendance records");

  const attendance = attendanceRecords.map(({ employee, date, status }) => {
    return { employee, date, status };
  });

  await Attendance.insertMany(attendance);

  return res.status(201).json({
    success: true,
    message: "Attendance marked successfully",
  });
});

const getEmployeeAttendance = catchErrors(async (req, res) => {
  const { employeeId } = req.params;

  if (!employeeId) throw new Error("Please provide employee id ");

  const attendanceRecord = await Attendance.find({ employee: employeeId });

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


export {
  markAttendance,
  getEmployeeAttendance,
  getEmployeesAttendancePercentage,
};
