import express from "express";
import {
  markAttendance,
  getEmployeeAttendance,
  getEmployeesAttendancePercentage,
  getAttendanceList,
} from "../controllers/attendance.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/mark", verifyAdminToken, markAttendance);
router.get("/employee/:id", verifyEmployeeToken, getEmployeeAttendance);
router.get("/list", verifyAdminToken, getAttendanceList);
router.get(
  "/percentage",
  verifyEmployeeToken,
  getEmployeesAttendancePercentage
);

export default router;
