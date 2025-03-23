import express from "express";
import {
  checkResetPasswordValidity,
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
router.patch("/reset/password", resetPassword);
router.get("/reset/password/validate", checkResetPasswordValidity);


export default router;
