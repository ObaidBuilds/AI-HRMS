import express from "express";
import { getFeedbacks, createFeedback } from "../controllers/feedback.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/",verifyAdminToken, getFeedbacks);
router.post("/",verifyEmployeeToken, createFeedback);

export default router;
