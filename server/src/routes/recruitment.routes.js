import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJobStatus,
  createApplicant,
  getJobApplications,
} from "../controllers/recruitment.controller.js";
import { verifyAdminToken } from "../middlewares/index.js";
import { uploadResume } from "../config/index.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", verifyAdminToken, createJob);
router.put("/:id/status", verifyAdminToken, updateJobStatus);
router.get("/:id/applicants", verifyAdminToken, getJobApplications);
router.post("/:id/apply", uploadResume.single("resume"), createApplicant);

export default router;
