import express from "express";
import {
  getComplaints,
  createComplaint,
  respondComplaint,
  assignComplaintForResolution,
} from "../controllers/complaint.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", verifyAdminToken, getComplaints);
router.post("/", verifyEmployeeToken, createComplaint);
router.patch("/:id", verifyAdminToken, respondComplaint);
router.patch(
  "/:id/assign",
  verifyAdminToken,
  assignComplaintForResolution
);

export default router;
