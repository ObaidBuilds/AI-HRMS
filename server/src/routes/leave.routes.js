import express from "express";
import {
  getLeaves,
  applyLeave,
  respondLeave,
  getEmployeesOnLeave,
  assignSustitute,
} from "../controllers/leave.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", verifyAdminToken, getLeaves);
router.patch("/:id", verifyAdminToken, respondLeave);
router.get("/employee", verifyAdminToken, getEmployeesOnLeave);
router.post("/", verifyEmployeeToken, applyLeave);
router.patch("/:id/substitute", verifyAdminToken, assignSustitute);


export default router;
