import { myCache } from "../utils/index.js";
import Leave from "../models/leave.model.js";
import { catchErrors } from "../utils/index.js";
import Employee from "../models/employee.model.js";
import Feedback from "../models/feedback.model.js";
import Complaint from "../models/complaint.model.js";
import {
  getDepartmentAttendancePercentage,
  getEmployeeAttendanceByMonth,
  getMonthlyAttendancePercentage,
} from "./attendance.controller.js";
import { getSentimentAnalysis } from "../predictions/index.js";
import Recruitment from "../models/recruitment.model.js";
import Performance from "../models/performance.model.js";

const getAdminInsights = catchErrors(async (req, res) => {
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
    jobApplications,
  ] = await Promise.all([
    // Basic counts
    Employee.countDocuments(),

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

    // Job Applications
    (async () => {
      const result = await Recruitment.aggregate([
        { $unwind: "$applicants" },
        { $match: { "applicants.status": "Applied" } },
        { $count: "totalApplied" },
      ]);

      if (result.length === 0) {
        return 0;
      }

      return result[0].totalApplied;
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
    jobApplications,
  };

  // myCache.set(cacheKey, insights);
  myCache.set(cacheKey, JSON.parse(JSON.stringify(insights)));

  return res.status(200).json({
    success: true,
    message: "Insights fetched successfully",
    insights,
  });
});

const getEmployeeInsights = catchErrors(async (req, res) => {
  const employee = req.user;

  if (!employee) throw new Error("Employee ID is required");

  const [
    performanceRecord,
    employeeData,
    leavesTaken,
    complaintResolved,
    feedbackSubmitted,
    attendancePercentageByMonth,
  ] = await Promise.all([
    Performance.findOne({ employee }).select("kpiScore kpis"),
    Employee.findById(employee).select("leaveBalance"),
    Complaint.find({ employee, status: "Approved" }).countDocuments(),
    Complaint.find({ employee, status: "Resolved" }).countDocuments(),
    Feedback.find({ employee }).countDocuments(),
    getEmployeeAttendanceByMonth(employee, new Date().getFullYear()),
  ]);

  const insights = {
    leaveBalance: employeeData?.leaveBalance || 0,
    leavesTaken,
    complaintResolved,
    feedbackSubmitted,
    attendance: attendancePercentageByMonth,
    performance: {
      kpiScore: performanceRecord?.kpiScore.toFixed(2) || 0,
      kpis: performanceRecord?.kpis || [],
    },
  };

  return res.status(200).json({
    success: true,
    message: "Insights fetched successfully",
    insights,
  });
});

export { getAdminInsights, getEmployeeInsights };
