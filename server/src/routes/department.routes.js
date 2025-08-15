import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartment,
  updateDepartment,
  getAllEmployeesForHead,
  getDepartmentEmployees,
} from "../controllers/department.controller.js";
import { verifyAdminToken } from "../middlewares/index.js";

const router = express.Router();

router.get("/head", getAllEmployeesForHead);
router.post("/", verifyAdminToken, createDepartment);
router.get("/:id/employees", getDepartmentEmployees);
router.get("/", verifyAdminToken, getAllDepartments);
router.get("/:id", verifyAdminToken, getDepartmentById);
router.delete("/:id", verifyAdminToken, deleteDepartment);
router.patch("/:id", verifyAdminToken, updateDepartment);

export default router;
