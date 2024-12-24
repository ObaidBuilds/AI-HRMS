import express from "express";
import {
  getComplaints,
  createComplaint,
  respondComplaint,
} from "../controllers/complaint.js";

const router = express.Router();

router.get("/", getComplaints);
router.post("/", createComplaint);
router.patch("/:complaintID", respondComplaint);

export default router;
