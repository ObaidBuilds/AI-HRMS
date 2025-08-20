import jwt from "jsonwebtoken";
import { catchErrors } from "../utils/index.js";
import Session from "../models/session.model.js";
import Employee from "../models/employee.model.js";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 4,
  keyGenerator: (req) => {
    const employeeId = req.body.employeeId || "guest";
    return ipKeyGenerator(req) + ":" + employeeId;
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req, res, next, options) => {
    const key = options.keyGenerator(req, res);
    const data = await options.store.get(key);

    let retryAfterSec = Math.ceil(options.windowMs / 1000);
    if (data && data.resetTime) {
      retryAfterSec = Math.ceil((data.resetTime.getTime() - Date.now()) / 1000);
    }

    const minutes = Math.floor(retryAfterSec / 60);
    const seconds = retryAfterSec % 60;

    res.status(options.statusCode).json({
      message: `Too many login attempts. Try again after ${minutes}m ${seconds}s.`,
    });
  },
});

const verifyEmployeeToken = catchErrors(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new Error("Unauthorized access");

  const decoded = jwt.verify(token, process.env.JWTSECRET);

  if (!decoded.employeeId) throw new Error("Unauthorized access");

  const session = await Session.findOne({
    userId: decoded.employeeId,
    authority: decoded.authority,
    token,
  });

  if (!session) throw new Error("Session expired, please login again");

  req.user = {
    id: decoded.employeeId,
    authority: decoded.authority,
    token,
  };

  next();
});

const verifyAdminToken = catchErrors(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new Error("Unauthorized access");

  const decoded = jwt.verify(token, process.env.JWTSECRET);

  const session = await Session.findOne({
    userId: decoded.employeeId,
    authority: decoded.authority,
    token,
  });

  if (!session) throw new Error("Session expired, please login again");

  const user = await Employee.findById(decoded.employeeId);

  if (!user || !user.admin) throw new Error("Unauthorized access");

  req.user = {
    id: decoded.employeeId,
    authority: decoded.authority,
    token,
  };

  next();
});

const verifyCornJob = catchErrors(async (req, res, next) => {

  const token = req.headers.secret?.trim();

  if (!token || token !== "imrankhanzindabad")
    throw new Error("Unauthorized access");

  next();
});

export { verifyEmployeeToken, verifyAdminToken, loginLimiter, verifyCornJob };
