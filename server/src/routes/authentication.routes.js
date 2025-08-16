import express from "express";
import {
  logout,
  login,
  logoutAll,
  resetPassword,
  forgetPassword,
  updatePassword,
  validateAuthority,
  checkResetPasswordValidity,
} from "../controllers/authentication.controller.js";
import {
  loginLimiter,
  verifyAdminToken,
  verifyEmployeeToken,
} from "../middlewares/index.js";

const router = express.Router();

router.post("/login", loginLimiter, login);
router.patch("/reset/password", resetPassword);
router.post("/forget/password", forgetPassword);
router.get("/logout", verifyEmployeeToken, logout);
router.get("/logout/all", verifyAdminToken, logoutAll);
router.post("/authority/validate", validateAuthority);
router.get("/reset/password/validate", checkResetPasswordValidity);
router.patch("/password/update", verifyEmployeeToken, updatePassword);

export default router;
