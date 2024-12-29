import express from "express";
import {
  markAttendance,
  getEmployeeAttendance,
  getAttendanceList,
  getMonthlyAttendancePercentage,
} from "../controllers/attendance.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/mark", verifyAdminToken, markAttendance);
router.get("/employee", verifyEmployeeToken, getEmployeeAttendance);
router.get("/", verifyAdminToken, getAttendanceList);
router.get("/month", verifyAdminToken, getMonthlyAttendancePercentage);

export default router;
