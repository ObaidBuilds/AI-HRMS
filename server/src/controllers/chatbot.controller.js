import getPredictionFromGeminiAI from "../gemini/index.js";
import Attendance from "../models/attendance.model.js";
import Complaint from "../models/complaint.model.js";
import Employee from "../models/employee.model.js";
import Leave from "../models/leave.model.js";
import Performance from "../models/performance.model.js";
import { catchErrors } from "../utils/index.js";

const answerAdminQuery = catchErrors(async (req, res) => {
  const admin = req.user;
  const { prompt } = req.body;

  if (!prompt) throw new Error("Please provide a query");

  const leaves = await Leave.find().lean();
  const feedbacks = await Employee.find().select("name feedback").lean();
  const performances = await Performance.find().lean();
  const attendances = await Attendance.find().lean();
  const employees = await Employee.find().lean();
  const complaints = await Complaint.find().lean();

  const formattedPrompt = `
 The admin has asked: **"${prompt}"**.
 Analyze the following HRMS data and provide an insightful response.
 Based on this data, answer the admin’s query accurately and *consicely*.
 `;

  const response = await getPredictionFromGeminiAI(formattedPrompt);

  return res.status(200).json({
    success: true,
    message: "Gemini replied successfully",
    response: response || "Failed to generate response, Try again later",
  });
});

export default answerAdminQuery;
