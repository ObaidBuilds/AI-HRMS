import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import { connectDB } from "./config/index.js";
import role from "./routes/role.routes.js";
import leave from "./routes/leave.routes.js";
import payroll from "./routes/payroll.routes.js";
import employee from "./routes/employee.routes.js";
import feedback from "./routes/feedback.routes.js";
import inshight from "./routes/insights.routes.js";
import complaint from "./routes/complaint.routes.js";
import attendance from "./routes/attendance.routes.js";
import department from "./routes/department.routes.js";
import performance from "./routes/performance.routes.js";
import authentication from "./routes/authentication.routes.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://metrohrms.netlify.app",
  "http://localhost:8000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Set-Cookie"],
  })
);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/roles", role);
app.use("/api/employees", employee);
app.use("/api/departments", department);
app.use("/api/auth", authentication);
app.use("/api/attendance", attendance);
app.use("/api/performance", performance);
app.use("/api/insights", inshight);
app.use("/api/leaves", leave);
app.use("/api/feedbacks", feedback);
app.use("/api/complaints", complaint);
app.use("/api/payrolls", payroll);

app.get("/", (req, res) => {
  const html = `
  <div
   style="font-family: 'Poppins', system-ui; max-width: 480px; width: 100%; margin: 40px auto; background: #2c2c2c; padding: 32px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); text-align: center;">
   <img src="http://metrohrms.netlify.app/metro.png" alt="Metro Cash & Carry Logo"
       style="width: 120px; margin-bottom: 24px; max-width: 100%; height: auto;">
   <div style="font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 8px;">Metro Cash & Carry</div>
   <h2 style="color: #ffffff; font-weight: 600; font-size: 22px; margin-bottom: 16px;">Welcome to Metro HRMS</h2>
    <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 16px 0;">
          Manage employees, track attendance, automate payroll, streamlime recruitment process and improve workforce efficiency with AI-powered insights.
      </p>
   <a href="${process.env.CLIENT_URL}"
       style="display: inline-block; padding: 12px 28px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 20px 0; transition: background 0.3s ease;">
      Visit Metro HRMS Portal
   </a>
   <div style="width: 100%; height: 1px; background: #444444; margin: 15px 0;"></div>
   <p style="margin-top: 24px; font-size: 12px; color: #999999;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
</div>`;

  res.send(html);
});

const port = process.env.PORT || 3000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express running → On http://localhost:${port} 🚀`);
    });
  })
  .catch((err) => {
    console.error(err.message);
  });

app.use((err, req, res, next) => {
  const message = err || "Internal server error";
  res.status(500).json({
    success: false,
    message,
  });
});
