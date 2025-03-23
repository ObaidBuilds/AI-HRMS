import express from "express";
import {
  createPayroll,
  getPayrollByEmployee,
  updatePayroll,
  markAsPaid,
  getAllPayrolls,
  getEmployeePayrollHistory,
} from "../controllers/payroll.controller.js";
import { verifyAdminToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", verifyAdminToken, getAllPayrolls);
router.post("/", verifyAdminToken, createPayroll);
router.put("/:payrollId", verifyAdminToken, updatePayroll);
router.patch("/:payrollId/pay", verifyAdminToken, markAsPaid);
router.get("/employee", verifyAdminToken, getPayrollByEmployee);
router.get("/history/:employee", verifyAdminToken, getEmployeePayrollHistory);

export default router;
