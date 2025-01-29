import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
  deleteRole,
  updateRole,
} from "../controllers/role.controller.js";
import { verifyAdminToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/", verifyAdminToken, createRole);
router.get("/", verifyAdminToken, getAllRoles);
router.get("/:id", verifyAdminToken, getRoleById);
router.delete("/:id", verifyAdminToken, deleteRole);
router.patch("/:id", verifyAdminToken, updateRole);

export default router;
