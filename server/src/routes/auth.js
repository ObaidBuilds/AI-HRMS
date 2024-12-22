import express from "express";
import { adminLogin, adminLogout } from "../controllers/authentication.js";
import { verifyAdminToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/logout", verifyAdminToken, adminLogout);

export default router;
