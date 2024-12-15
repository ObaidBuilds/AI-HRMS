import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
  deleteRole,
  updateRole,
} from "../controllers/role.js";
import { verifyAdminToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/", verifyAdminToken, createRole);
router.get("/", getAllRoles);
router.get("/:roleID", verifyAdminToken, getRoleById);
router.delete("/:roleID", verifyAdminToken, deleteRole);
router.patch("/:roleID", verifyAdminToken, updateRole);

export default router;
