import express from "express";
import { login, logout } from "../controllers/authentication.js";
import { verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", verifyEmployeeToken, logout);

export default router;
