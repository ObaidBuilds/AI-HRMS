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

router.post("/", verifyAdminToken, createPayroll);
router.get("/employee", getPayrollByEmployee);
router.get("/", getAllPayrolls);
router.put("/:payrollId", verifyAdminToken, updatePayroll);
router.patch("/:payrollId/pay", verifyAdminToken, markAsPaid);
router.get("/history/:employee", verifyAdminToken, getEmployeePayrollHistory);

export default router;
