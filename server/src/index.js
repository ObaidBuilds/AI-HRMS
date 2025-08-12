import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import { connectDB } from "./config/index.js";
import {
  role,
  leave,
  payroll,
  employee,
  feedback,
  inshight,
  complaint,
  attendance,
  department,
  performance,
  recruitment,
  authentication,
} from "./routes/index.routes.js";
import { swaggerUi, swaggerSpec } from "./doc/index.js";
import {
  deleteAllPayrollRecords,
  generatePayrollDataForMonths,
  generatePayrollDataForYear,
} from "./seeders/index.js";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

const allowedOrigins = [process.env.CLIENT_URL];

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
  secure: true,
});

// deleteAllPayrollRecords()
// generatePayrollDataForMonths(8)
// generatePayrollDataForYear(2025)

app.use("/api/roles", role);
app.use("/api/leaves", leave);
app.use("/api/payrolls", payroll);
app.use("/api/insights", inshight);
app.use("/api/employees", employee);
app.use("/api/feedbacks", feedback);
app.use("/api/auth", authentication);
app.use("/api/complaints", complaint);
app.use("/api/attendance", attendance);
app.use("/api/departments", department);
app.use("/api/performance", performance);
app.use("/api/recruitment", recruitment);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.use((req, res, next) => {
  const error = new Error("404 Endpoint Not Found");
  error.status = 404;
  next(error.message);
});

app.use((err, req, res, next) => {
  const message = err || "Internal server error";
  res.status(500).json({
    success: false,
    message,
  });
});
