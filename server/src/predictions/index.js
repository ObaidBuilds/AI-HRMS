import getPredictionFromGeminiAI from "../gemini/index.js";
import Employee from "../models/employee.model.js";
import Complaint from "../models/complaint.model.js";
import Leave from "../models/leave.model.js";
import Performance from "../models/performance.model.js";
import Feedback from "../models/feedback.model.js";

async function getSubstitute({ department, shift }) {
  let requiredShift;

  if (shift === "Morning") requiredShift = ["Evening", "Night"];
  else if (shift === "Evening") requiredShift = ["Morning", "Night"];
  else requiredShift = ["Morning", "Evening"];

  const employees = await Employee.find({
    status: "Active",
    department,
    shift: { $in: requiredShift },
  }).sort({ leaveBalance: -1 });

  if (!employees.length) {
    return { availability: false, message: "No suitable substitute found." };
  }

  const prompt = `
  You are an AI assistant helping to assign a substitute employee for a shift in the department "${department}".
  The following employees are available, and their details are as follows:
  ${employees
    .map(
      (emp, index) =>
        `${index + 1}. Name: ${emp.name}, Email: ${emp.email}, Current Shift: ${
          emp.shift
        }, Leave Balance: ${emp.leaveBalance}`
    )
    .join("\n")}
  
  The current shift requiring a substitute is "${shift}". 
  Your task is to suggest the most suitable substitute based on leave balance and shift compatibility. 
  If no perfect match is found, return the least possible match. 
  
  Please respond with **only** a valid JSON object in the following format:
  {
    "name": "Employee Name",
    "email": "employee@example.com"
  }`;

  let suggestedEmployee;

  try {
    const aiResponse = await getPredictionFromGeminiAI(prompt);

    const cleanedResponse = aiResponse.replace(/```json|```|\n/g, "").trim();

    suggestedEmployee = JSON.parse(cleanedResponse);

    if (!suggestedEmployee.name || !suggestedEmployee.email) {
      throw new Error("Incomplete JSON data from AI response.");
    }

    console.log("AI Suggested");
  } catch (error) {
    console.error("Error with AI prediction or parsing:", error.message);

    suggestedEmployee = {
      name: employees[0].name,
      email: employees[0].email,
    };
  }

  return {
    availability: true,
    id: employees.find((e) => e.email === suggestedEmployee.email)?._id,
    email: suggestedEmployee.email,
    name: suggestedEmployee.name,
  };
}

function getSentimentAnalysis(rating) {
  if (rating >= 4) {
    return "Positive";
  } else if (rating === 3) {
    return "Neutral";
  } else {
    return "Negative";
  }
}

async function getAnswerFromChatbot(prompt) {
  const [leaves, feedbacks, performances, employees, complaints] =
    await Promise.all([
      Leave.find().populate("employee", "name").lean(),
      Feedback.find().populate("employee", "name").lean(),
      Performance.find().populate("employee", "name").lean(),
      Employee.find().populate("department role").lean(),
      Complaint.find().populate("employee", "name").lean(),
    ]);

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
        } | **Rating:** ${per.rating} | **Attendance Percentage:** ${
          per.kpis.attendance
        }`
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

  return response || "⚠️ Failed to generate response, Try again later";
}

export { getSubstitute, getSentimentAnalysis, getAnswerFromChatbot };
