import Performance from "../models/performance.model.js";
import { catchErrors } from "../utils/index.js";

export const addPerformanceWithKPI = catchErrors(async (req, res) => {
  const { employee, kpis, feedback } = req.body;

  if (
    !employee ||
    !kpis?.taskCompletion ||
    !kpis?.attendance ||
    !kpis?.deadlinesMet
  )
    throw new Error("All fields are required");

  const kpiScore =
    kpis.taskCompletion * 0.4 + kpis.attendance * 0.3 + kpis.deadlinesMet * 0.3;

  const performance = await Performance.create({
    employee,
    kpis,
    kpiScore,
    feedback,
  });

  return res.status(200).json({
    success: true,
    message: "Performance added successfully",
    performance,
  });
});

export const updatePerformance = catchErrors(async (req, res) => {
  const { id, kpis, feedback } = req.body;

  if (!id || !kpis?.taskCompletion || !kpis?.attendance || !kpis?.deadlinesMet)
    throw new Error("All fields are required");

  const kpiScore =
    kpis.taskCompletion * 0.4 + kpis.attendance * 0.3 + kpis.deadlinesMet * 0.3;

  const performance = await Performance.findByIdAndUpdate(
    id,
    { kpis, kpiScore, feedback, lastUpdated: Date.now() },
    { new: true }
  );

  if (!performance) throw new Error("Performance not found");

  return res.status(200).json({
    success: true,
    message: "Performance updated successfully",
    performance,
  });
});

export const getAllPerformances = catchErrors(async (req, res) => {
  const { page = 1, limit = 13 } = req.query;

  const query = {};

  const pageNumber = Math.max(parseInt(page), 1);
  const limitNumber = Math.max(parseInt(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const performances = await Performance.find()
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
    .skip(skip)
    .sort({ kpis: -1 })
    .limit(limitNumber);

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
