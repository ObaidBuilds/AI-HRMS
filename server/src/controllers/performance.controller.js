import Performance from "../models/performance.model.js";
import { catchErrors } from "../utils/index.js";
import { calculateAverageAttendance } from "./attendance.controller.js";

export const addPerformanceWithKPI = async (employee) => {
  if (!employee) throw new Error("All fields are required");

  const rating = 0;

  const kpis = {
    attendance: 0,
  };

  const kpiScore = kpis.attendance * 0.5 + (rating / 5) * 100 * 0.5;

  await Performance.create({
    employee,
    kpis,
    kpiScore,
    rating,
    feedback: "",
  });

  return true;
};

export const updatePerformance = catchErrors(async (req, res) => {
  const { employeeID } = req.params;
  const { kpis, feedback, rating } = req.body;

  if (!employeeID || !kpis?.attendance)
    throw new Error("All fields are required");

  const kpiScore =
    kpis.attendance * 0.5 +
    (parseInt(rating) ? (parseInt(rating) / 5) * 100 * 0.5 : 0);

  const performance = await Performance.findByIdAndUpdate(
    employeeID,
    {
      kpis,
      kpiScore,
      feedback,
      rating: parseInt(rating),
      lastUpdated: Date.now(),
    },
    { new: true }
  ).populate({
    path: "employee",
    select: "name employeeId  role",
    populate: [{ path: "role", select: "name" }],
  });

  if (!performance) throw new Error("Performance not found");

  return res.status(200).json({
    success: true,
    message: "Performance updated successfully",
    performance,
  });
});

export const getAllPerformances = catchErrors(async (req, res) => {
  const { page = 1, limit = 13 } = req.query;

  const pageNumber = Math.max(parseInt(page), 1);
  const limitNumber = Math.max(parseInt(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const performances = await Performance.find()
    .populate({
      path: "employee",
      select: "name employeeId  role",
      populate: [{ path: "role", select: "name" }],
    })
    .skip(skip)
    .limit(limitNumber)
    .sort({ kpiScore: -1 });

  for (let performance of performances) {
    const attendance = await calculateAverageAttendance(
      performance.employee._id
    );

    performance.kpis.attendance = attendance;
    performance.kpiScore = attendance * 0.3 + performance.rating * 0.7;
  }

  const totalPerformances = await Performance.countDocuments();
  const totalPages = Math.ceil(totalPerformances / limitNumber);

  return res.status(200).json({
    success: true,
    message: "Performance fetched successfully",
    performances,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalPerformances,
      limit: limitNumber,
    },
  });
});

export const getPerformanceMetricsById = catchErrors(async (req, res) => {
  const { employeeID } = req.params;

  if (!employeeID) throw new Error("Employee ID is required");

  const performance = await Performance.findOne({
    employee: employeeID,
  }).populate({
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
  });

  if (!performance) throw new Error("No performance data found");

  return res.status(200).json({
    success: true,
    performance,
  });
});
