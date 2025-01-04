import express from "express";
import {
  markAttendance,
  getEmployeeAttendance,
  getAttendanceList,
  markAttendanceByQrCode,
  genrateQrCodeForAttendance,
  getMonthlyAttendancePercentage,
} from "../controllers/attendance.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/mark", verifyAdminToken, markAttendance);
router.get("/employee", verifyEmployeeToken, getEmployeeAttendance);
router.get("/", verifyAdminToken, getAttendanceList);
router.get("/month", verifyAdminToken, getMonthlyAttendancePercentage);
router.get("/mark/qr", verifyEmployeeToken, markAttendanceByQrCode);
router.get("/generate", verifyEmployeeToken, genrateQrCodeForAttendance);

export default router;
