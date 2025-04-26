import { myCache } from "../utils/index.js";
import Leave from "../models/leave.model.js";
import { catchErrors } from "../utils/index.js";
import Employee from "../models/employee.model.js";
import Feedback from "../models/feedback.model.js";
import Complaint from "../models/complaint.model.js";
import Department from "../models/department.model.js";
import {
  getDepartmentAttendancePercentage,
  getMonthlyAttendancePercentage,
} from "./attendance.controller.js";
import { getSentimentAnalysis } from "../predictions/index.js";

const getInsights = catchErrors(async (req, res) => {
  const cacheKey = "insights";

  const cachedInsights = myCache.get(cacheKey);
  if (cachedInsights) {
    return res.status(200).json({
      success: true,
      message: "Insights fetched successfully (from cache)",
      insights: cachedInsights,
    });
  }

  const today = new Date();

  // Group all parallel queries together
  const [
    totalEmployees,
    totalDepartments,
    { pendingComplaints: totalComplaints, allComplaints: totalAllComplaints },
    departmentAttandancePercent,
    overallAttendancePercentage,
    totalMaleEmployees,
    pendingLeaves,
    employeesOnLeave,
    feedbackResult,
    totalLeaves,
    { rejectedLeaves, approvedLeaves },
    { resolvedComplaints, closedComplaints },
  ] = await Promise.all([
    // Basic counts
    Employee.countDocuments(),
    Department.countDocuments(),

    // Complaints counts
    (async () => {
      const [pendingComplaints, allComplaints] = await Promise.all([
        Complaint.countDocuments({ status: "Pending" }),
        Complaint.countDocuments(),
      ]);
      return { pendingComplaints, allComplaints };
    })(),

    // Attendance percentages
    getDepartmentAttendancePercentage(),
    getMonthlyAttendancePercentage(),

    // Employee demographics
    Employee.countDocuments({ gender: "Male" }),

    // Leave status counts
    Leave.countDocuments({ status: "Pending" }),
    Leave.countDocuments({
      status: "Approved",
      $or: [
        { fromDate: { $lte: today }, toDate: { $gte: today } },
        { fromDate: { $lte: today }, toDate: null },
      ],
    }),

    // Feedback aggregation
    Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
        },
      },
    ]),

    // Total leaves
    Leave.countDocuments(),

    // Leave status counts
    (async () => {
      const [rejected, approved] = await Promise.all([
        Leave.countDocuments({ status: { $regex: "rejected", $options: "i" } }),
        Leave.countDocuments({ status: { $regex: "approved", $options: "i" } }),
      ]);
      return { rejectedLeaves: rejected, approvedLeaves: approved };
    })(),

    // Complaint resolutions
    (async () => {
      const [resolved, closed] = await Promise.all([
        Complaint.countDocuments({
          status: { $regex: "resolved", $options: "i" },
        }),
        Complaint.countDocuments({
          status: { $regex: "closed", $options: "i" },
        }),
      ]);
      return { resolvedComplaints: resolved, closedComplaints: closed };
    })(),
  ]);

  const sentimentAnalysis = getSentimentAnalysis(
    feedbackResult[0]?.avgRating || 0
  );

  // Calculate rates
  const leaveRejectionRate =
    totalLeaves > 0 ? (rejectedLeaves / totalLeaves) * 100 : 0;
  const leaveApprovalRate =
    totalLeaves > 0 ? (approvedLeaves / totalLeaves) * 100 : 0;
  const complaintResolutionRate =
    totalAllComplaints > 0
      ? (resolvedComplaints / totalAllComplaints) * 100
      : 0;
  const complaintCloseRate =
    totalAllComplaints > 0 ? (closedComplaints / totalAllComplaints) * 100 : 0;

  const insights = {
    totalEmployees,
    totalDepartments,
    totalComplaints,
    pendingLeaves,
    employeesOnLeave,
    sentimentAnalysis,
    totalMaleEmployees,
    totalFemaleEmployees: totalEmployees - totalMaleEmployees,
    departmentAttandancePercent,
    overallAttendancePercentage,
    leaveRejectionRate,
    leaveApprovalRate,
    complaintResolutionRate,
    complaintCloseRate,
  };

  myCache.set(cacheKey, insights);

  return res.status(200).json({
    success: true,
    message: "Insights fetched successfully",
    insights,
  });
});

export { getInsights };
