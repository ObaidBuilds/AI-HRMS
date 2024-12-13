import Employee from "../models/employee.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { catchErrors } from "../utils/index.js";

const adminLogin = catchErrors(async (req, res) => {
  const { employeeId, password } = req.body;

  if (!employeeId || !password) throw new Error("Please provide all fields");

  const employee = await Employee.findOne({ employeeId });

  if (!employee || !employee.admin) throw new Error("Invalid credentials");

  const comparePassword = await bcrypt.compare(password, employee.password);

  if (!comparePassword) throw new Error("Invalid credentials");

  const token = jwt.sign({ employeeId: employee._id }, process.env.JWTSECRET);

  return res
    .cookie("token", token, {
      httpOnly: true,
    })
    .status(201)
    .json({
      success: true,
      message: "Logged in successfuly",
      admin: {
        name: employee.name,
        email: employee.email,
        profilePicture: employee.profilePicture,
      },
    });
});

const adminLogout = catchErrors(async (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
});


export { adminLogin, adminLogout };
