import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJobStatus,
  createApplicant,
  getJobApplications,
  updateApplicationStatus,
  inviteForInterview,
} from "../controllers/recruitment.controller.js";
import { verifyAdminToken } from "../middlewares/index.js";
import {  uploadResume } from "../config/index.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", verifyAdminToken, createJob);
router.patch("/:id/status", verifyAdminToken, updateJobStatus);
router.get("/:id/applicants", verifyAdminToken, getJobApplications);
router.post("/:id/apply", uploadResume.single("resume"), createApplicant);
router.patch(
  "/:jobId/applicants/:applicantId/status",
  verifyAdminToken,
  updateApplicationStatus
);
router.post(
  "/:jobId/applicants/:applicantId/invite",
  verifyAdminToken,
  inviteForInterview
);

export default router;
