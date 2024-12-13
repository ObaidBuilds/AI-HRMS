import express from "express";
import { adminLogin, adminLogout } from "../controllers/authentication.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/logout", adminLogout);

export default router;
