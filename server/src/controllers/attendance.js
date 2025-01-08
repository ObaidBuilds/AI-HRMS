import cron from "node-cron";
import cloudinary from "cloudinary";
import Attendance from "../models/attendance.js";
import Employee from "../models/employee.js";
import { generateQrCode, getLocation } from "../utils/index.js";
import { catchErrors } from "../utils/index.js";
import { myCache, getPublicIdFromUrl } from "../utils/index.js";

const today = new Date();
today.setHours(0, 0, 0, 0);
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

cron.schedule("0 23 * * *", async () => {
  // This will run every day at 11:00 PM
  await markAbsentAtEndOfDay();
});

const getAttendanceList = catchErrors(async (req, res) => {
  const { department, date } = req.query;

  console.log(department, date);

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
  const id = req.user;
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

  await Attendance.create({
    employee: id,
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
  const id = req.user;
  const { latitude, longitude } = req.body;

  console.log(latitude, longitude);

  const isPresent = await Attendance.findOne({
    employee: id,
    date: {
      $gte: today,
      $lt: tomorrow,
    },
  });

  console.log(isPresent);
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

const markAbsentAtEndOfDay = async () => {
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

  console.log("Absent employees have been marked for today.");
};

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

  const formattedData = Array.from({ length: 12 }, (_, i) => {
    const monthData = attendanceData.find((data) => data.month === i + 1);
    return {
      month: new Date(0, i).toLocaleString("default", { month: "long" }),
      attendancePercentage:
        parseInt(monthData?.attendancePercentage.toFixed(2)) || 0,
    };
  });

  return formattedData;
};

export {
  getAttendanceList,
  markAttendance,
  getEmployeeAttendance,
  markAttendanceByQrCode,
  getDepartmentAttendancePercentage,
  getMonthlyAttendancePercentage,
  genrateQrCodeForAttendance,
};
