import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { catchErrors } from "../utils/index.js";
import Employee from "../models/employee.model.js";
import Attendance from "../models/attendance.model.js";
import { myCache, getPublicIdFromUrl } from "../utils/index.js";
import { decodeQR, generateQrCode, getLocation } from "../utils/index.js";

const today = new Date();
today.setHours(0, 0, 0, 0);
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const getAttendanceList = catchErrors(async (req, res) => {
  const { department, date } = req.query;

  if (!department)
    throw new Error("Please provide a department to get the sheet");

  if (!date) throw new Error("Please provide a date to get the sheet");

  const queryDate = new Date(date);

  const alreadyMarked = await Attendance.find({ date: queryDate });

  const allEmployees = await Employee.find({ department }).select(
    "name employeeId"
  );

  const employees = allEmployees.filter((employee) => {
    return !alreadyMarked.some(
      (attendance) => attendance.employee.toString() === employee._id.toString()
    );
  });

  if (employees.length === 0)
    throw new Error("No employees are there to mark attendance");

  res.status(200).json({
    success: true,
    message: "Attendance list fetched",
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

  await Attendance.insertMany(attendance);

  myCache.del("insights");

  return res.status(201).json({
    success: true,
    message: "Attendance marked successfully",
    addedRecords: attendance.length,
  });
});

const markAttendanceByQrCode = catchErrors(async (req, res) => {
  const id = req.user.id;
  const { qrcode } = req.body;

  if (!qrcode) throw new Error("All fields are required");

  const isPresent = await Attendance.findOne({
    employee: id,
    date: {
      $gte: today,
      $lt: tomorrow,
    },
  });

  if (isPresent) throw new Error("Attendance already marked");

  const employeeId = await decodeQR(qrcode);

  if (!(employeeId == id)) throw new Error("Proxy na lga sale!");

  await Attendance.create({
    employee: employeeId,
    status: "Present",
    date: today,
  });

  const publicId = getPublicIdFromUrl(qrcode);

  if (publicId) {
    const res = await cloudinary.v2.uploader.destroy(`qrcodes/${publicId}`);

    if (res.result !== "ok") throw new Error("Id" + res.result);
  } else throw new Error("Invalid Cloudinary id");

  return res.status(201).json({
    success: true,
    message: "Attendance marked successfully",
  });
});

const genrateQrCodeForAttendance = catchErrors(async (req, res) => {
  const id = req.user.id;
  const { latitude, longitude } = req.body;

  console.log(latitude, longitude);

  const isPresent = await Attendance.findOne({
    employee: id,
    date: {
      $gte: today,
      $lt: tomorrow,
    },
  });

  if (isPresent) throw new Error("Attendance already marked");

  const distance = getLocation(latitude, longitude);

  if (!(distance <= 500)) {
    throw new Error(
      "You are not within the allowed location radius to mark attendance."
    );
  }

  const qrcode = await generateQrCode(id);

  return res.status(201).json({
    success: true,
    message: "Qrcode genearated successfully",
    qrcode,
  });
});

const markAbsentAtEndOfDay = catchErrors(async (req, res) => {
  const employees = await Employee.find();

  for (const employee of employees) {
    const attendance = await Attendance.findOne({
      employee: employee._id,
      date: today,
    });

    if (!attendance) {
      await Attendance.create({
        employee: employee._id,
        status: "Absent",
        date: today,
      });
    }
  }

  return res.json({
    success: true,
    message: "Absent employees marked successfully.",
  });
});

const getEmployeeAttendance = catchErrors(async (req, res) => {
  const employeeID = req.user.id;

  if (!employeeID) throw new Error("Please provide employee id");

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

  return res.status(200).json({
    success: true,
    message: "Attendance fetched successfully",
    attendance: {
      attendancePercentage: attendancePercentage.toFixed(2),
      attendanceRecord,
    },
  });
});

const getEmployeeAttendanceByDepartment = catchErrors(async (req, res) => {
  const { department, date } = req.query;

  if (!department || !date) {
    throw new Error("Please provide department and date");
  }

  const queryDate = new Date(date);
  const departmentId = new mongoose.Types.ObjectId(department);

  const attendanceRecord = await Attendance.aggregate([
    {
      $match: { date: queryDate },
    },
    {
      $lookup: {
        from: "employees",
        localField: "employee",
        foreignField: "_id",
        as: "employee",
      },
    },
    { $unwind: "$employee" },
    {
      $lookup: {
        from: "departments",
        localField: "employee.department",
        foreignField: "_id",
        as: "employee.department",
      },
    },
    { $unwind: "$employee.department" },
    {
      $lookup: {
        from: "roles",
        localField: "employee.role",
        foreignField: "_id",
        as: "employee.role",
      },
    },
    { $unwind: "$employee.role" },
    {
      $match: { "employee.department._id": departmentId },
    },
    {
      $project: {
        _id: 1,
        date: 1,
        status: 1,
        "employee.name": 1,
        "employee.employeeId": 1,
        "employee.department.name": 1,
        "employee.role.name": 1,
      },
    },
    { $sort: { date: -1 } },
  ]);

  if (attendanceRecord.length === 0)
    throw new Error(
      "No Attendance record found of the desired department for the selected date"
    );

  return res.status(200).json({
    success: true,
    message: "Attendance fetched successfully",
    attendanceRecord,
  });
});

const getDepartmentAttendancePercentage = async () => {
  try {
    const departmentAttendance = await Attendance.aggregate([
      {
        $lookup: {
          from: "employees",
          localField: "employee",
          foreignField: "_id",
          as: "employeeDetails",
        },
      },
      {
        $unwind: {
          path: "$employeeDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "employeeDetails.department",
          foreignField: "_id",
          as: "departmentDetails",
        },
      },
      {
        $unwind: {
          path: "$departmentDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "departmentDetails.name": { $ne: null },
        },
      },
      {
        $group: {
          _id: "$departmentDetails.name",
          totalPresent: {
            $sum: {
              $cond: [{ $eq: ["$status", "Present"] }, 1, 0],
            },
          },
          totalRecords: { $sum: 1 },
        },
      },
      {
        $addFields: {
          attendancePercentage: {
            $multiply: [{ $divide: ["$totalPresent", "$totalRecords"] }, 100],
          },
        },
      },
      {
        $project: {
          _id: 1,
          attendancePercentage: 1,
        },
      },
      {
        $sort: {
          attendancePercentage: -1,
        },
      },
    ]);

    return departmentAttendance;
  } catch (error) {
    console.error(error.message);
  }
};

const getMonthlyAttendancePercentage = async () => {
  const year = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const attendanceData = await Attendance.aggregate([
    {
      $match: {
        date: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$date" },
        totalRecords: { $sum: 1 },
        totalPresent: {
          $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        month: "$_id",
        _id: 0,
        attendancePercentage: {
          $multiply: [{ $divide: ["$totalPresent", "$totalRecords"] }, 100],
        },
      },
    },
    { $sort: { month: 1 } },
  ]);

  const formattedData = Array.from({ length: currentMonth }, (_, i) => {
    const monthData = attendanceData.find((data) => data.month === i + 1);
    return {
      month: new Date(0, i).toLocaleString("default", { month: "long" }),
      attendancePercentage: monthData
        ? parseInt(monthData.attendancePercentage.toFixed(2))
        : 0,
    };
  });

  return formattedData;
};

const calculateAverageAttendance = async (employeeId) => {
  const attendanceRecords = await Attendance.find({ employee: employeeId });

  if (!attendanceRecords || attendanceRecords.length === 0) return 0;

  const totalDays = attendanceRecords.length;
  const presentDays = attendanceRecords.filter(
    (record) => record.status === "Present"
  ).length;

  const attendancePercentage = (presentDays / totalDays) * 100;

  return attendancePercentage.toFixed(2);
};

const getEmployeeAttendanceByMonth = async (employeeId, year) => {
  if (!employeeId) throw new Error("Employee ID is required");

  const queryYear = year || new Date().getFullYear();

  const attendanceData = await Attendance.aggregate([
    {
      $match: {
        employee: new mongoose.Types.ObjectId(employeeId),
        date: {
          $gte: new Date(`${queryYear}-01-01`),
          $lte: new Date(`${queryYear}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: "$date" },
        totalRecords: { $sum: 1 },
        totalPresent: {
          $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        month: "$_id",
        _id: 0,
        attendancePercentage: {
          $multiply: [{ $divide: ["$totalPresent", "$totalRecords"] }, 100],
        },
      },
    },
    { $sort: { month: 1 } },
  ]);

  const formattedData = Array.from({ length: 12 }, (_, i) => {
    const monthData = attendanceData.find((data) => data.month === i + 1);
    return {
      month: new Date(0, i).toLocaleString("default", { month: "long" }),
      attendancePercentage: monthData
        ? parseFloat(monthData.attendancePercentage.toFixed(2))
        : 0,
    };
  });

  return formattedData;
};

export {
  markAttendance,
  getAttendanceList,
  markAbsentAtEndOfDay,
  getEmployeeAttendance,
  markAttendanceByQrCode,
  genrateQrCodeForAttendance,
  calculateAverageAttendance,
  getEmployeeAttendanceByMonth,
  getMonthlyAttendancePercentage,
  getDepartmentAttendancePercentage,
  getEmployeeAttendanceByDepartment,
};
