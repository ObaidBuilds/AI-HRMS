import express from "express";
import {
  addPerformanceWithKPI,
  updatePerformance,
  getAllPerformances,
  getPerformanceMetricsById,
} from "../controllers/performance.controller.js";

const router = express.Router();

router.post("/", addPerformanceWithKPI);
router.patch("/", updatePerformance);
router.get("/", getAllPerformances);
router.get("/:employeeID", getPerformanceMetricsById);

export default router;
