import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  getDepartmentEmployees,
  deleteDepartment,
  updateDepartment,
} from "../controllers/department.js";
import { verifyAdminToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/", verifyAdminToken, createDepartment);
router.get("/", getAllDepartments);
router.get("/:departmentID", verifyAdminToken, getDepartmentById);
router.get(
  "/:departmentID/employees",
  verifyAdminToken,
  getDepartmentEmployees
);
router.delete("/:departmentID", verifyAdminToken, deleteDepartment);
router.patch("/:departmentID", verifyAdminToken, updateDepartment);

export default router;
