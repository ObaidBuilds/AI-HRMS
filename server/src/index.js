import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import { connectDB } from "./config/index.js";
import role from "./routes/role.routes.js";
import leave from "./routes/leave.routes.js";
import inshight from "./routes/insights.routes.js";
import employee from "./routes/employee.routes.js";
import feedback from "./routes/feedback.routes.js";
import authentication from "./routes/authentication.routes.js";
import complaint from "./routes/complaint.routes.js";
import attendance from "./routes/attendance.routes.js";
import department from "./routes/department.routes.js";
import performance from "./routes/performance.routes.js";


const app = express();

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
