import express from "express";
import {
  markAttendance,
  getAttendanceList,
  markAbsentAtEndOfDay,
  getEmployeeAttendance,
  markAttendanceByQrCode,
  genrateQrCodeForAttendance,
  getMonthlyAttendancePercentage,
  getEmployeeAttendanceByDepartment,
} from "../controllers/attendance.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/mark/absent", markAbsentAtEndOfDay);
router.get("/", verifyAdminToken, getAttendanceList);
router.post("/mark", verifyAdminToken, markAttendance);
router.get("/employee", verifyEmployeeToken, getEmployeeAttendance);
router.post("/mark/qr", verifyEmployeeToken, markAttendanceByQrCode);
router.get("/month", verifyAdminToken, getMonthlyAttendancePercentage);
router.post("/generate", verifyEmployeeToken, genrateQrCodeForAttendance);
router.get("/department", verifyAdminToken, getEmployeeAttendanceByDepartment);

export default router;
