import Employee from "../models/employee.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchErrors } from "../utils/index.js";

const login = catchErrors(async (req, res) => {
  const { employeeId, password, authority } = req.body;

  if (!employeeId || !password || !authority)
    throw new Error("Please provide all fields");

  const employee = await Employee.findOne({ employeeId })
    .populate("department", "name")
    .populate("role", "name");

  if (!employee) throw new Error("Invalid credentials");

  if (authority.toLowerCase() === "admin" && !employee.admin)
    throw new Error("Unauthorize access");

  const comparePassword = await bcrypt.compare(password, employee.password);

  if (!comparePassword) throw new Error("Invalid credentials");

  const token = jwt.sign({ employeeId: employee._id }, process.env.JWTSECRET);

  return res.status(201).json({
    success: true,
    message: "Logged in successfuly 🔑",
    token,
    user: {
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.role,
      shift: employee.shift,
      leaveBalance: employee.leaveBalance,
      employmentType: employee.employmentType,
      profilePicture: employee.profilePicture,
      authority: authority.toLowerCase(),
    },
  });
});

const logout = catchErrors(async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});



export { login, logout };
