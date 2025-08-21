import express from "express";
import { getDate, getUpdates } from "../controllers/update.controller.js";
import answerAdminQuery from "../controllers/chatbot.controller.js";
import {
  getAdminInsights,
  getEmployeeInsights,
} from "../controllers/insights.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/date", verifyEmployeeToken, getDate);
router.get("/", verifyAdminToken, getAdminInsights);
router.get("/updates", verifyEmployeeToken, getUpdates);
router.post("/chat", verifyAdminToken, answerAdminQuery);
router.get("/employee", verifyEmployeeToken, getEmployeeInsights);

export default router;
