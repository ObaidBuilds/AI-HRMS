import express from "express";
import {
  updateProfile,
  updateEmployee,
  deleteEmployee,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  bulkCreateEmployees,
} from "../controllers/employee.controller.js";
import { upload } from "../config/index.js";
import { verifyAdminToken, verifyEmployeeToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/", verifyAdminToken, createEmployee);
router.get("/", verifyAdminToken, getAllEmployees);
router.post("/bulk", verifyAdminToken, bulkCreateEmployees);
router.patch(
  "/profile",
  verifyEmployeeToken,
  upload.single("profilePicture"),
  updateProfile
);
router.get("/:id", verifyEmployeeToken, getEmployeeById);
router.delete("/:id", verifyAdminToken, deleteEmployee);
router.patch("/:id", verifyEmployeeToken, updateEmployee);

export default router;
