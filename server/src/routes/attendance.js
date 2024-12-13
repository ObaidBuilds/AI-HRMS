import express from "express";
import { 
  markAttendance, 
  getEmployeeAttendance, 
  getEmployeesAttendancePercentage 
} from "../controllers/attendance.js";

const router = express.Router();

router.post("/mark", markAttendance);
router.get("/employee/:id", getEmployeeAttendance); 
router.get("/percentage", getEmployeesAttendancePercentage); 

export default router;
