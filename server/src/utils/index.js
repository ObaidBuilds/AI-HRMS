import NodeCache from "node-cache";
import nodemailer from "nodemailer";
import Employee from "../models/employee.js";
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
   <div
    style="font-family: Poppins; max-width: 600px; margin: 30px auto; background-color: #1f1f1f; border: 1px solid #333; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);">
    <!-- Header -->
    <div style="color: #fff; padding: 20px; border-bottom: 1px solid gray; display: flex; gap: 10px;">
        <img src="https://img.freepik.com/premium-vector/metro-logo-icon-design_470209-40.jpg?ga=GA1.1.1159554069.1729552283&semt=ais_hybrid"
            alt="Metro Logo" style="max-width: 70px; border-radius: 8px;">
    </div>
    <div style="padding: 25px;">
        <p style="font-size: 16px; color: #bdbdbd;">Dear <strong style="font-weight: bold;">${name}</strong>,</p>
        <p style="font-size: 16px; color: #bdbdbd; margin-bottom: 15px;">
            Your shift is scheduled on <strong style="color: gray;">${shift}</strong> as a substitute for <strong ">${subsName}</strong> 
        in the <strong ">${department}</strong> department.
        </p>
        <p style="font-size: 16px; color: #bdbdbd; margin-bottom: 15px;">
            The shift is from ${fromDate} to ${toDate}. of duration <strong>${duration}</strong> days
        </p>
        <p style="font-size: 16px; color: #bdbdbd; margin-bottom: 15px;">
            Please ensure your presence and cooperate with the team to maintain seamless operations.
        </p>
        <div style="text-align: center; margin:20px 0px 0px 0px;">
            <a href="https://metrohrms.netlify.app"
                style="width: 85%; text-decoration: none; display: inline-block; border: none; background-color: rgb(31, 31, 98); color: #fff; padding: 15px 25px; font-size: 0.9rem; border-radius: 25px; font-weight: bold;">
                Visit HRMS Portal
            </a>
        </div>
    </div>
    <div
        style="background-color: #212121; text-align: center; padding: 15px; border-top: 1px solid rgb(124, 124, 124);">
        <p style="font-size: 14px; color: #9e9e9e; margin: 0;">
            If you have any questions, please contact HR at
            <a href="mailto:hr@metrohrms.com"
                style="color: rgb(66, 219, 66); text-decoration: none;">hr@metrohrms.com</a>.
        </p>
        <p style="margin-top: 10px; font-size: 13px; color: grey;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
    </div>
    </div>
    `,
  };

  await sendMail(message);
}

async function getSubstitute({ department, shift }) {
  let requiredShift;

  if (shift === "Morning") {
    requiredShift = ["Evening", "Night"];
  } else if (shift === "Evening") {
    requiredShift = ["Morning", "Night"];
  } else {
    requiredShift = ["Morning", "Evening"];
  }

  const employees = await Employee.find({
    status: "Active",
    department,
    shift: { $in: requiredShift },
  }).sort({ leaveBalance: -1 });

  if (!employees.length) return { availability: false };

  const employee = employees[0];

  return {
    availability: true,
    id: employee._id,
    email: employee.email,
    name: employee.name,
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

export {
  catchErrors,
  myCache,
  sendMail,
  notifySubstituteEmployee,
  getSubstitute,
  getSentimentAnalysis,
};
