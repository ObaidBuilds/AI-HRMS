import express from "express";
import {
  login,
  logout,
  updatePassword,
} from "../controllers/authentication.controller.js";
import { verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/login", login);
router.patch("/password", verifyEmployeeToken, updatePassword);
router.get("/logout", verifyEmployeeToken, logout);

export default router;
