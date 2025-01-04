import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import { connectDB } from "./config/index.js";
import roleRoutes from "./routes/role.js";
import authRoutes from "./routes/auth.js";
import leaveRoutes from "./routes/leave.js";
import inshightRoutes from "./routes/insights.js";
import employeeRoutes from "./routes/employee.js";
import feedbackRoutes from "./routes/feedback.js";
import attendanceRoutes from "./routes/attendance.js";
import departmentRoutes from "./routes/department.js";
import complaintRoutes from "./routes/complaint.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

/* ___________Intance____________ */
const app = express();

/* _____________Middlewares_____________ */
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* _______________Static Serving________________ */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/qrcodes", express.static(__dirname + "/qrcodes"));

/*_______________CORS Configuration__________ */

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

/* ______________cloudinary Config______________ */

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ______________API Routes______________ */

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

/* _____________Express Server________________ */

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

/* ______________Error Middleware_______________ */

app.use((err, req, res, next) => {
  const message = err || "Internal server error";
  res.status(500).json({
    success: false,
    message,
  });
});
