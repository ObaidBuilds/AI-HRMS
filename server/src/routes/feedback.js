import express from "express";
import { getFeedbacks, createFeedback } from "../controllers/feedback.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", getFeedbacks);
router.post("/", createFeedback);

export default router;
