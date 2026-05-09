import express from "express";
import { getAvailableModels } from "../controllers/aiModel.controller.js";
import { verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/", verifyEmployeeToken, getAvailableModels);

export default router;
