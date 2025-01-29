import express from "express";
import { getUpdates } from "../controllers/update.controller.js";
import { getInsights } from "../controllers/insights.controller.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", verifyAdminToken, getInsights);
router.get("/updates", verifyEmployeeToken, getUpdates);

export default router;
