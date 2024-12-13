import express from "express";
import { 
  createDepartment, 
  getAllDepartments, 
  getDepartmentById, 
  getDepartmentEmployees, 
  deleteDepartment, 
  updateDepartment 
} from "../controllers/department.js";

const router = express.Router();

router.post("/", createDepartment);
router.get("/", getAllDepartments);
router.get("/:departmentID", getDepartmentById);
router.get("/:departmentID/employees", getDepartmentEmployees);
router.delete("/:departmentID", deleteDepartment);
router.patch("/:departmentID", updateDepartment);

export default router;
