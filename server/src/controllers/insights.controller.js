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
 
  const totalEmployees = await Employee.countDocuments();
  const totalDepartments = await Department.countDocuments();
  const totalComplaints = await Complaint.find({
    status: "Pending",
  }).countDocuments();
  const departmentAttandancePercent = await getDepartmentAttendancePercentage();
  const overallAttendancePercentage = await getMonthlyAttendancePercentage();
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
    overallAttendancePercentage,
  };

  myCache.set(cacheKey, insights);

  return res.status(200).json({
    success: true,
    message: "Insights fetched successfully",
    insights,
  });
});

export { getInsights };
