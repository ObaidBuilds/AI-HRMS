import express from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
  updateProfilePicture,
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
  updateProfilePicture
);
router.get("/:id", verifyEmployeeToken, getEmployeeById);
router.delete("/:id", verifyAdminToken, deleteEmployee);
router.patch("/:id", verifyEmployeeToken, updateEmployee);

export default router;
