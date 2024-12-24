import NodeCache from "node-cache";
import nodemailer from "nodemailer";
import Employee from "../models/employee.js";
import getPredictionFromGeminiAI from "../gemini/index.js";
const myCache = new NodeCache();

const catchErrors = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err.message);
    });
  };
};

const sendMail = async (option) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.USER,
    to: option.email,
    subject: option.subject,
    text: option.text,
    html: option.html,
  });

  return info;
};

async function notifySubstituteEmployee(
  email,
  subsName,
  name,
  shift,
  department,
  toDate,
  fromDate,
  duration
) {
  const message = {
    email,
    subject: "Metro Shift Alert",
    text: `Dear ${subsName}, your shift is scheduled on ${shift} as a substitute for ${name} in the ${department} department from ${fromDate} to ${toDate}. Please ensure your presence.`,
    html: `
  <div style="font-family: Poppins, Arial, sans-serif; max-width: 600px; margin: 30px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); background-color: #ffffff;">
    <div style="background-color: #333333; color: #fff; padding: 20px 30px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center;">
        <img src="https://img.freepik.com/premium-vector/metro-logo-icon-design_470209-40.jpg?ga=GA1.1.1159554069.1729552283&semt=ais_hybrid"
            alt="Metro Logo" style="max-width: 70px; border-radius: 8px; margin-right: 20px;">
        <h2 style="font-size: 22px; font-weight: 500; margin: 0;">Metro HRMS</h2>
    </div>

    <div style="padding: 25px 30px;">
        <p style="font-size: 16px; color: #555555; margin-bottom: 15px;">Dear <strong style="color: #000000;">${subsName}</strong>,</p>
        <p style="font-size: 16px; color: #555555; margin-bottom: 15px;">
            Your shift is scheduled on <strong style="color: #4CAF50;">${shift}</strong> as a substitute for <strong style="color: #000000;">${name}</strong>
            in the <strong style="color: #000000;">${department}</strong> department.
        </p>
        <p style="font-size: 16px; color: #555555; margin-bottom: 15px;">
            The shift is from <strong>${fromDate}</strong> to <strong>${toDate}</strong>, with a total duration of <strong>${duration}</strong> days.
        </p>
        <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
            Please ensure your presence and cooperate with the team to maintain seamless operations.
        </p>

        <div style="text-align: center; margin-top: 20px;">
            <a href="https://metrohrms.netlify.app"
                style="width: 85%; text-decoration: none; display: inline-block; border: none; background-color: #1F1F62; color: #fff; padding: 15px 25px; font-size: 0.9rem; border-radius: 25px; font-weight: bold;">
                Visit HRMS Portal
            </a>
        </div>
    </div>

    <div style="background-color: #212121; color: #9e9e9e; text-align: center; padding: 20px; border-top: 1px solid #333333;">
        <p style="font-size: 14px; margin: 0;">
            If you have any questions, please contact HR at
            <a href="mailto:hr@metrohrms.com" style="color: #4CAF50; text-decoration: none;">hr@metrohrms.com</a>.
        </p>
        <p style="margin-top: 10px; font-size: 13px;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
    </div>
</div>

    `,
  };

  await sendMail(message);
}

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

export default getSubstitute;

function getSentimentAnalysis(rating) {
  if (rating >= 4) {
    return "Positive";
  } else if (rating === 3) {
    return "Neutral";
  } else {
    return "Negative";
  }
}

export {
  catchErrors,
  myCache,
  sendMail,
  notifySubstituteEmployee,
  getSubstitute,
  getSentimentAnalysis,
};
