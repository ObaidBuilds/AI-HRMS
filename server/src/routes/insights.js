import express from "express";
import { getInsights } from "../controllers/insights.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";
import { getUpdates } from "../controllers/update.js";

const router = express.Router();

router.get("/", verifyAdminToken, getInsights);
router.get("/updates", verifyEmployeeToken, getUpdates);

export default router;
