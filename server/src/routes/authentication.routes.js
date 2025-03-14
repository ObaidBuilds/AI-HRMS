import express from "express";
import {
  forgetPassword,
  login,
  logout,
  resetPassword,
  updatePassword,
} from "../controllers/authentication.controller.js";
import { verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", verifyEmployeeToken, logout);
router.patch("/password/update", verifyEmployeeToken, updatePassword);
router.post("/forget/password", forgetPassword);
router.patch("/password", resetPassword);

export default router;
