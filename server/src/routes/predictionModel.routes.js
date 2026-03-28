import express from "express";
import {
  createPredictionModel,
  getAllPredictionModels,
  getPredictionModelById,
  updatePredictionModel,
  deletePredictionModel,
} from "../controllers/predictionModel.controller.js";
import { verifyAdminToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/", verifyAdminToken, createPredictionModel);
router.get("/", verifyAdminToken, getAllPredictionModels);
router.get("/:id", verifyAdminToken, getPredictionModelById);
router.patch("/:id", verifyAdminToken, updatePredictionModel);
router.delete("/:id", verifyAdminToken, deletePredictionModel);

export default router;
