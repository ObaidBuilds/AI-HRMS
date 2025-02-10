import getPredictionFromGeminiAI from "../gemini/index.js";
import Attendance from "../models/attendance.model.js";
import Complaint from "../models/complaint.model.js";
import Employee from "../models/employee.model.js";
import Leave from "../models/leave.model.js";
import Performance from "../models/performance.model.js";
import Feedback from "../models/feedback.model.js";
import { catchErrors } from "../utils/index.js";

const answerAdminQuery = catchErrors(async (req, res) => {
  const admin = req.user;
  const { prompt } = req.body;

  if (!prompt) throw new Error("Please provide a query");

  const leaves = await Leave.find().populate("employee", "name").lean();
  const feedbacks = await Feedback.find().populate("employee", "name").lean();
  const performances = await Performance.find()
    .populate("employee", "name")
    .lean();
  const attendances = await Attendance.find()
    .populate("employee", "name")
    .lean();
  const employees = await Employee.find().populate("department role").lean();
  const complaints = await Complaint.find().populate("employee", "name").lean();

  const formattedPrompt = `
  **Admin Query:** "${prompt}"
  
  ### About the HRMS  
  This HRMS is developed for **Metro Cash & Carry** using **MERN** & **Gemini AI** by **Obaid Ali**.  
  It includes the following modules:  
  1. **Employee Management**  
  2. **Attendance and Time Tracking** (QR code-based attendance)  
  3. **Leave Management** (AI-powered substitute assigning)  
  4. **Performance Management**  
  5. **Feedback and Complaint Management**  
  6. **AI-Based Sentiment Analysis**  
  7. **Recruitment Management**  
  8. **Analytics and Reporting**  
  
  ---
  
  ### Response Guidelines:
  - If the prompt is a **greeting**, e.g HI or Hello respond  **only**  how may i assist you (with an emoji).  
  - If the prompt is a **farewell**, say goodbye in a professional and friendly manner (with an emoji).  
  - If the prompt is related to **HRMS insights**, analyze the provided data and generate a well-structured, insightful, and concise response.  
  
  ---
  
  ### HRMS Data Analysis:
  
  #### **Employee Data**  
  ${employees
    .map(
      (emp, index) =>
        `${index + 1}. **Name:** ${emp.name} | **Department:** ${
          emp.department.name
        } | **Role:** ${emp.role.name} | **Salary:** ${
          emp.salary
        } | **Admin:** ${emp.admin}`
    )
    .join("\n")}
  
  #### **Performance Data**  
  ${performances
    .map(
      (per, index) =>
        `${index + 1}. **Name:** ${per.employee.name} | **KPI Score:** ${
          per.kpiScore
        } | **Rating:** ${per.rating} | **Attendance Percentage:** ${per.kpis.attendance}`
    )
    .join("\n")}
  
  #### **Leave Data**  
  ${leaves
    .map(
      (leave, index) =>
        `${index + 1}. **Name:** ${leave.employee.name} | **Type:** ${
          leave.leaveType
        } | **Date:** ${leave.fromDate} - ${leave.toDate} | **Status:** ${
          leave.status
        }`
    )
    .join("\n")}
  **All Leave Types:** Sick, Casual, Vacation, Unpaid  
  
  #### **Complaint Data**  
  ${complaints
    .map(
      (com, index) =>
        `${index + 1}. **Name:** ${com.employee.name} | **Complaint Type:** ${
          com.leaveType
        } | **Status:** ${com.status}`
    )
    .join("\n")}
  **All Complaint Types:** Workplace, Payroll, Leave, Harassment, Scheduling, Misconduct  
  
  #### **Feedback Data**  
  ${feedbacks
    .map(
      (feed, index) =>
        `${index + 1}. **Name:** ${feed.employee.name} | **Review:** ${
          feed.review
        } | **Rating:** ${feed.rating} | **Suggestion:** ${feed.suggestion}`
    )
    .join("\n")}
  
  ---
  
  ### Generate an insightful and concise response to the admin's query based on the provided data.
  `;

  const response = await getPredictionFromGeminiAI(formattedPrompt);

  return res.status(200).json({
    success: true,
    message: "Gemini replied successfully",
    response: response || "⚠️ Failed to generate response, Try again later",
  });
});

export default answerAdminQuery;
