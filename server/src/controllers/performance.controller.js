import { catchErrors } from "../utils/index.js";
import Performance from "../models/performance.model.js";
import { calculateAverageAttendance } from "./attendance.controller.js";

const addPerformanceWithKPI = async (employee) => {
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

  if (!employeeID || !kpis) throw new Error("All fields are required");

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

const getAllPerformances = catchErrors(async (req, res) => {
  const { page = 1, limit = 12, status } = req.query;

  const pageNumber = Math.max(parseInt(page), 1);
  const limitNumber = Math.max(parseInt(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  let query = {};

  if (status === "good") query.kpiScore = { $gt: 75 };
  else if (status === "average") query.kpiScore = { $gt: 50, $lte: 75 };
  else if (status === "poor") query.kpiScore = { $lte: 50 };

  const performances = await Performance.find(query)
    .populate({
      path: "employee",
      select: "name employeeId role",
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
    performance.kpiScore =
      attendance * 0.5 + (performance.rating / 5) * 100 * 0.5;
    await performance.save();
  }

  const totalPerformances = await Performance.countDocuments(query);
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

const getPerformanceMetricsById = catchErrors(async (req, res) => {
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

const deletePerformance = async (employee) => {
  if (!employee) throw new Error("Please provide employee Id");

  const performance = await Performance.deleteOne({ employee });

  if (performance.deletedCount) return;

  return "Performance deleted successfuly";
};

export {
  deletePerformance,
  getAllPerformances,
  addPerformanceWithKPI,
  getPerformanceMetricsById,
};
