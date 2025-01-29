import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/index.js";
import roleRoutes from "./routes/role.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import inshightRoutes from "./routes/insights.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import authRoutes from "./routes/authentication.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";
import departmentRoutes from "./routes/department.routes.js";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:8000",
  "http://192.168.10.10:8000",
  "https://metrohrms.netlify.app",
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

app.use("/api/roles", roleRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/insights", inshightRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => {
  res.send("HRMS For Metro");
});

const port = process.env.PORT || 4000;
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
