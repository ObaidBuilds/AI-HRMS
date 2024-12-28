import express from "express";
import {
  login,
  logout,
  updateProfilePicture,
} from "../controllers/authentication.js";
import { verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", verifyEmployeeToken, logout);
router.patch("/profile", verifyEmployeeToken, updateProfilePicture);

export default router;
