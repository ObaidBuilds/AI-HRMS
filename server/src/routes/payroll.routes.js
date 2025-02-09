import express from "express";
import {
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
} from "../controllers/payroll.controller.js";

const router = express.Router();

router.get("/", getAllPayrolls);
router.get("/:id", getPayrollById);
router.patch("/:id", updatePayroll);

export default router;
