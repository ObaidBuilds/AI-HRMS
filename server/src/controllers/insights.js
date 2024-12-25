import Employee from "../models/employee.js";
import Department from "../models/department.js";
import Leave from "../models/leave.js";
import Feedback from "../models/feedback.js";
import Complaint from "../models/complaint.js";
import { catchErrors } from "../utils/index.js";
import { getDepartmentAttendancePercentage } from "./attendance.js";
import { myCache } from "../utils/index.js";
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

  const totalEmployees = await Employee.countDocuments();
  const totalDepartments = await Department.countDocuments();
  const totalComplaints = await Complaint.find({
    createdAt: today,
  }).countDocuments();
  const departmentAttandancePercent = await getDepartmentAttendancePercentage();
  const totalMaleEmployees = await Employee.countDocuments({ gender: "Male" });
  const pendingLeaves = await Leave.find({
    status: "Pending",
  }).countDocuments();
  const employeesOnLeave = await Leave.find({
    status: "Approved",
    $or: [
      { fromDate: { $lte: today }, toDate: { $gte: today } },
      { fromDate: { $lte: today }, toDate: null },
    ],
  }).countDocuments();

  const feedbacks = await Feedback.aggregate([
    {
      $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  const sentimentAnalysis = getSentimentAnalysis(feedbacks[0]?.avgRating || 0);

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
  };

  myCache.set(cacheKey, insights);

  return res.status(200).json({
    success: true,
    message: "Insights fetched successfully",
    insights,
  });
});

export { getInsights };
