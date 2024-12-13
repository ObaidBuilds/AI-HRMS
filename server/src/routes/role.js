import express from "express";
import { 
  createRole, 
  getAllRoles, 
  getRoleById, 
  deleteRole, 
  updateRole 
} from "../controllers/role.js";

const router = express.Router();

router.post("/", createRole);
router.get("/", getAllRoles);
router.get("/:roleID", getRoleById);
router.delete("/:roleID", deleteRole);
router.patch("/:roleID", updateRole);

export default router;
