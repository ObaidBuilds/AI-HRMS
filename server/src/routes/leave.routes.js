import express from "express";
import {
  getLeaves,
  applyLeave,
  respondLeave,
  getEmployeesOnLeave,
} from "../controllers/leave.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", verifyAdminToken, getLeaves);
router.get("/employee", verifyAdminToken, getEmployeesOnLeave);
router.post("/", verifyEmployeeToken, applyLeave);
router.patch("/:id", verifyAdminToken, respondLeave);

export default router;
