import express from "express";
import {
  getLeaves,
  applyLeave,
  respondLeave,
  assignSustitute,
  getEmployeesOnLeave,
} from "../controllers/leave.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", verifyAdminToken, getLeaves);
router.post("/", verifyEmployeeToken, applyLeave);
router.patch("/:id", verifyAdminToken, respondLeave);
router.get("/employee", verifyAdminToken, getEmployeesOnLeave);
router.patch("/:id/substitute", verifyAdminToken, assignSustitute);

export default router;
