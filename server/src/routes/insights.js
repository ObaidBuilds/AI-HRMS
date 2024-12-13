import express from "express";
import { getInsights } from "../controllers/insights.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", getInsights);

export default router;
