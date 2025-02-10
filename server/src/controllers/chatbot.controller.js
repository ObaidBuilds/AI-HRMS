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

  // -**Attendance Data ${attendances
  //   .map(
  //     (atd, index) =>
  //       `${index + 1}. Name : ${atd.employee.name} Date: ${
  //         atd.date
  //       }, Status : ${atd.status},`
  //   )
  //   .join("\n")}

  const formattedPrompt = `
 The admin has asked: **"${prompt}"**.
 Some info of this hrms 
This is made for **Metro cach & carry** using MERN & Gemini by **Obaid ALi**
They have modules like :
1.Employee Management
2. Attendance and Time Tracking
QR code-based attendance system
4. Leave Management ( AI Substitute Assigning )
6. Performance Management
7. Feedback and Complaint Management
8. AI-Based Sentiment Analysis
9. Recruitment Management
10. Analytics and Reporting

If prompt is any greet say How may i assist you with an emoji
and if prompt is Bye etc then say the admin Bye in better way with emoji

 Analyze the following HRMS data and provide an insightful response.
  -**Employee Data ${employees
    .map(
      (emp, index) =>
        `${index + 1}. Name: ${emp.name}, Department: ${
          emp.department.name
        } Role: ${emp.role.name} Salary: ${emp.salary}  is Admin: ${emp.admin},`
    )
    .join("\n")}
    -**Performance Data ${performances
      .map(
        (per, index) =>
          `${index + 1}. Name : ${per.employee.name} Score: ${
            per.kpiScore
          }, Rating : ${per.rating},`
      )
      .join("\n")}
        -**Leave Data ${leaves
          .map(
            (leave, index) =>
              `${index + 1}. Name : ${leave.employee.name} Type: ${
                leave.leaveType
              }, 
        Date : ${leave.fromDate} - ${leave.toDate} Type: ${leave.status}, `
          )
          .join("\n")}
           ALl leave types : "Sick", "Casual", "Vacation", "Unpaid"
          -**Complaint Data ${complaints
            .map(
              (com, index) =>
                `${index + 1}. Name : ${com.employee.name} Compleiny Type: ${
                  com.leaveType
                }, 
        Status: ${com.status}, `
            )
            .join("\n")}
          ALl complaint types : "Workplace", "Payroll", "Leave", "Harassment","Scheduling","Misconduct",
      -**Feedback Data ${feedbacks
        .map(
          (feed, index) =>
            `${index + 1}. Name : ${feed.employee.name} Review: ${feed.review},
         Rating : ${feed.rating}, Suggestion : ${feed.suggestion}`
        )
        .join("\n")}
 Based on this data, answer the admin’s query accurately and *consicely*.
 `;

  const response = await getPredictionFromGeminiAI(formattedPrompt);

  return res.status(200).json({
    success: true,
    message: "Gemini replied successfully",
    response: response || "⚠️ Failed to generate response, Try again later",
  });
});

export default answerAdminQuery;
