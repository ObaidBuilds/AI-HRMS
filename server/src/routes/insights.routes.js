import express from "express";
import { getUpdates } from "../controllers/update.controller.js";
import { getInsights } from "../controllers/insights.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";
import answerAdminQuery from "../controllers/chatbot.controller.js";

const router = express.Router();

router.get("/", getInsights);
router.get("/updates", verifyEmployeeToken, getUpdates);
router.post("/chat", verifyAdminToken, answerAdminQuery);

export default router;
