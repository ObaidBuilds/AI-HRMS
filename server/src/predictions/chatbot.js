import Leave from "../models/leave.model.js";
import Feedback from "../models/feedback.model.js";
import Employee from "../models/employee.model.js";
import Complaint from "../models/complaint.model.js";
import Performance from "../models/performance.model.js";
import Recruitment from "../models/recruitment.model.js";
import getPredictionFromGeminiAI from "../gemini/index.js";

async function getAnswerFromChatbot(prompt) {
  const [leaves, feedbacks, performances, employees, complaints, jobs] =
    await Promise.all([
      Leave.find().populate("employee", "name").lean(),
      Feedback.find().populate("employee", "name").lean(),
      Performance.find().populate("employee", "name").lean(),
      Employee.find().populate("department role").lean(),
      Complaint.find().populate("employee", "name").lean(),
      Recruitment.find().populate("department role postedBy", "name").lean(),
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
    7. **Recruitment Management** (Jobs + Applicants)  
    8. **Analytics and Reporting**  
    
    ---
    
    ### Response Guidelines:
    - If the prompt is a **greeting**, e.g HI or Hello respond  **only**  how may i assist you (with an emoji).  
    - If the prompt is a **farewell**, say goodbye in a professional and friendly manner (with an emoji).   
    - If the query is irrelevant to the system, Respond with: "This seems unrelated to the system. Could you clarify or ask a relevant question?"
  
    ---
    
    ### HRMS Data Analysis:
    
    #### **Employee Data**  
    ${employees
      .map(
        (emp, index) =>
          `${index + 1}. **Name:** ${emp?.name} | **Department:** ${
            emp?.department?.name
          } | **Role:** ${emp?.role?.name} | **Salary:** ${
            emp?.salary
          } | **Admin:** ${emp?.admin}`
      )
      .join("\n")}
    
    #### **Performance Data**  
    ${performances
      .map(
        (per, index) =>
          `${index + 1}. **Name:** ${per?.employee?.name} | **KPI Score:** ${
            per.kpiScore
          } | **Rating:** ${per?.rating} | **Attendance Percentage:** ${
            per?.kpis.attendance
          }`
      )
      .join("\n")}
    
    #### **Leave Data**  
    ${leaves
      .map(
        (leave, index) =>
          `${index + 1}. **Name:** ${leave?.employee?.name} | **Type:** ${
            leave?.leaveType
          } | **Date:** ${leave?.fromDate} - ${leave?.toDate} | **Status:** ${
            leave?.status
          }`
      )
      .join("\n")}
    **All Leave Types:** Sick, Casual, Vacation, Unpaid  
    
    #### **Complaint Data**  
    ${complaints
      .map(
        (com, index) =>
          `${index + 1}. **Name:** ${
            com?.employee?.name
          } | **Complaint Type:** ${com?.leaveType} | **Status:** ${
            com?.status
          }`
      )
      .join("\n")}
    **All Complaint Types:** Workplace, Payroll, Leave, Harassment, Scheduling, Misconduct  
    
    #### **Feedback Data**  
    ${feedbacks
      .map(
        (feed, index) =>
          `${index + 1}. **Name:** ${feed?.employee?.name} | **Review:** ${
            feed?.review
          } | **Rating:** ${feed?.rating} | **Suggestion:** ${feed?.suggestion}`
      )
      .join("\n")}

    #### **Recruitment Data**  
    ${jobs
      .map(
        (job, index) => `
        ${index + 1}. **Job Title:** ${job?.title} | **Department:** ${
          job?.department?.name
        } | **Role:** ${job?.role?.name} | **Location:** ${
          job?.location
        } | **Salary Range:** ${job?.minSalary} - ${
          job?.maxSalary
        } | **Type:** ${job?.type} | **Status:** ${
          job?.status
        } | **Posted By:** ${job?.postedBy?.name} | **Deadline:** ${
          job?.deadline
        }
        
        **Applicants:**  
        ${job?.applicants
          .map(
            (app, i) =>
              `   - ${i + 1}. **Name:** ${app?.name} | **Email:** ${
                app?.email
              } | **Phone:** ${app?.phone} | **Status:** ${app?.status}`
          )
          .join("\n")}
      `
      )
      .join("\n")}
    
    ---
    
    ### Generate an insightful and concise response to the admin's query based on the provided data.
    `;

  const response = await getPredictionFromGeminiAI(formattedPrompt);

  return response || "⚠️ Failed to generate response, Try again later";
}

export default getAnswerFromChatbot;
