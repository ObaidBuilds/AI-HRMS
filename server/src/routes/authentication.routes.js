import express from "express";
import {
  checkResetPasswordValidity,
  forgetPassword,
  login,
  logout,
  resetPassword,
  updatePassword,
  validateAuthority,
} from "../controllers/authentication.controller.js";
import { verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/login", login);
router.patch("/reset/password", resetPassword);
router.post("/forget/password", forgetPassword);
router.post("/authority/check", validateAuthority);
router.get("/logout", verifyEmployeeToken, logout);
router.get("/reset/password/validate", checkResetPasswordValidity);
router.patch("/password/update", verifyEmployeeToken, updatePassword);


export default router;
