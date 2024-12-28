import Attendance from "../models/attendance.js";
import Department from "../models/department.js";
import Employee from "../models/employee.js";
import { catchErrors } from "../utils/index.js";
import { myCache } from "../utils/index.js";

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

  if (!attendanceRecords || attendanceRecords.length === 0) {
    throw new Error("Please provide valid attendance records");
  }

  const attendance = attendanceRecords.map(({ employee, date, status }) => ({
    employee,
    date: new Date(date).toISOString(),
    status,
  }));

  const existingRecords = await Attendance.find({
    $or: attendance.map(({ employee, date }) => ({
      employee,
      date: new Date(date),
    })),
  });

  const existingMap = new Set(
    existingRecords.map(
      (record) => `${record.employee}-${record.date.toISOString()}`
    )
  );

  const newAttendance = attendance.filter(
    ({ employee, date }) => !existingMap.has(`${employee}-${date}`)
  );

  if (newAttendance.length === 0) {
    throw new Error("Attendance already marked");
  }

  await Attendance.insertMany(newAttendance);

  myCache.del("insights");

  return res.status(201).json({
    success: true,
    message: "Attendance marked successfully",
    addedRecords: newAttendance.length,
  });
});

const getEmployeeAttendance = catchErrors(async (req, res) => {
  const employeeID = req.user;

  if (!employeeID) throw new Error("Please provide employee id ");

  const attendanceRecord = await Attendance.find({ employee: employeeID })
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
    .sort({ date: -1 });

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
    attendance: {
      attendancePercentage: attendancePercentage.toFixed(2),
      attendanceRecord,
    },
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
  getDepartmentAttendancePercentage,
};
