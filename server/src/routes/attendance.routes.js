import express from "express";
import {
  markAttendance,
  getEmployeeAttendance,
  getAttendanceList,
  markAttendanceByQrCode,
  genrateQrCodeForAttendance,
  getMonthlyAttendancePercentage,
  getEmployeeAttendanceByDepartment,
  markAbsentAtEndOfDay,
} from "../controllers/attendance.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

app.get("/mark/absent", markAbsentAtEndOfDay);
router.get("/", verifyAdminToken, getAttendanceList);
router.post("/mark", verifyAdminToken, markAttendance);
router.get("/employee", verifyEmployeeToken, getEmployeeAttendance);
router.post("/mark/qr", verifyEmployeeToken, markAttendanceByQrCode);
router.get("/month", verifyAdminToken, getMonthlyAttendancePercentage);
router.post("/generate", verifyEmployeeToken, genrateQrCodeForAttendance);
router.get("/department", verifyAdminToken, getEmployeeAttendanceByDepartment);

export default router;
