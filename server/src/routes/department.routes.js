import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  getDepartmentEmployees,
  deleteDepartment,
  updateDepartment,
} from "../controllers/department.controller.js";
import { verifyAdminToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/", verifyAdminToken, createDepartment);
router.get("/", verifyAdminToken, getAllDepartments);
router.get("/:id", verifyAdminToken, getDepartmentById);
router.get(
  "/:id/employees",
  verifyAdminToken,
  getDepartmentEmployees
);
router.delete("/:id", verifyAdminToken, deleteDepartment);
router.patch("/:id", verifyAdminToken, updateDepartment);

export default router;
