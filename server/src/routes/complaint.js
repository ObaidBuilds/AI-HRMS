import express from "express";
import {
  getComplaints,
  createComplaint,
  respondComplaint,
} from "../controllers/complaint.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", verifyAdminToken, getComplaints);
router.post("/", verifyEmployeeToken, createComplaint);
router.patch("/:complaintID", verifyAdminToken, respondComplaint);

export default router;
