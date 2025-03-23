import express from "express";
import {
  getLeaves,
  applyLeave,
  respondLeave,
  getEmployeesOnLeave,
} from "../controllers/leave.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", getLeaves);
router.patch("/:id", respondLeave);
router.get("/employee", getEmployeesOnLeave);
router.post("/", verifyEmployeeToken, applyLeave);

export default router;
