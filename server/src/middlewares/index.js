import jwt from "jsonwebtoken";
import { catchErrors } from "../utils/index.js";
import Employee from "../models/employee.model.js";

const verifyEmployeeToken = catchErrors(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
 
  if (!token) throw new Error("Unauthorized access");

  const decoded = jwt.verify(token, process.env.JWTSECRET);

  if (!decoded.employeeId) throw new Error("Unauthorized access");

  req.user = decoded.employeeId;

  next();
});

const verifyAdminToken = catchErrors(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new Error("Unauthorized access");

  const decoded = jwt.verify(token, process.env.JWTSECRET);

  const user = await Employee.findById(decoded.employeeId);

  if (!user || !user.admin) throw new Error("Unauthorized access");

  next();
});

export { verifyEmployeeToken, verifyAdminToken };
