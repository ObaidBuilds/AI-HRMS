import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
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
import recruitment from "./routes/recruitment.routes.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const allowedOrigins = [
  "http://localhost:8000",
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
app.use("/api/recruitment", recruitment);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "welcome.html"));
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
