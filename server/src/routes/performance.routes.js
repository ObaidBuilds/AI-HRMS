import express from "express";
import {
  updatePerformance,
  getAllPerformances,
  getPerformanceMetricsById,
} from "../controllers/performance.controller.js";
import { verifyAdminToken } from "../middlewares/index.js";

const router = express.Router();

router.patch("/:employeeID", verifyAdminToken, updatePerformance);
router.get("/", verifyAdminToken, getAllPerformances);
router.get("/:employeeID", verifyAdminToken, getPerformanceMetricsById);

export default router;
