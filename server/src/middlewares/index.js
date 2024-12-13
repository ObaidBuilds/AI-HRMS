import jwt from "jsonwebtoken";
import { catchErrors } from "../utils/index.js";
import Employee from "../models/employee.js";

const verifyEmployeeToken = catchErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new Error("Unauthorized access");

  const decoded = jwt.verify(token, process.env.JWTSECRET);

  const user = await Employee.findById(decoded.employeeId);

  if (!user) throw new Error("Unauthorized access");

  req.user = user;
  next();
});

const verifyAdminToken = catchErrors(async (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) throw new Error("Unauthorized access");

  const decoded = jwt.verify(token, process.env.JWTSECRET);
  const user = await Employee.findById(decoded.employeeId);

  if (!user || !user.admin) throw new Error("Unauthorized access");

  req.user = user;
  next();
});

export { verifyEmployeeToken, verifyAdminToken };
