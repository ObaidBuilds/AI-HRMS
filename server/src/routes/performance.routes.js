import express from "express";
import {
  updatePerformance,
  getAllPerformances,
  getPerformanceMetricsById,
} from "../controllers/performance.controller.js";

const router = express.Router();

router.patch("/", updatePerformance);
router.get("/", getAllPerformances);
router.get("/:employeeID", getPerformanceMetricsById);

export default router;
