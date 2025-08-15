import express from "express";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";
import {
  getFeedbacks,
  createFeedback,
} from "../controllers/feedback.controller.js";

const router = express.Router();

router.get("/", verifyAdminToken, getFeedbacks);
router.post("/", verifyEmployeeToken, createFeedback);

export default router;
