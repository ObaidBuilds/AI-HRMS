import express from "express";
import {
  markAsPaid,
  createPayroll,
  updatePayroll,
  getAllPayrolls,
  getPayrollByEmployee,
  getEmployeePayrollHistory,
} from "../controllers/payroll.controller.js";
import { verifyAdminToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", verifyAdminToken, getAllPayrolls);
router.post("/", verifyAdminToken, createPayroll);
router.patch("/:payrollId", verifyAdminToken, updatePayroll);
router.patch("/:payrollId/pay", verifyAdminToken, markAsPaid);
router.get("/employee", verifyAdminToken, getPayrollByEmployee);
router.get("/history/:employee", verifyAdminToken, getEmployeePayrollHistory);

export default router;
