import express from "express";
import { 
  createEmployee, 
  getAllEmployees, 
  getEmployeeById, 
  deleteEmployee, 
  updateEmployee 
} from "../controllers/employee.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.get("/:employeeID", getEmployeeById);
router.delete("/:employeeID", deleteEmployee);
router.patch("/:employeeID", updateEmployee);

export default router;
