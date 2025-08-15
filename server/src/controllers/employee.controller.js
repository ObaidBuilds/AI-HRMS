import dotenv from "dotenv";
dotenv.config();

import * as bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import { myCache } from "../utils/index.js";
import Employee from "../models/employee.model.js";
import { catchErrors, getPublicIdFromUrl } from "../utils/index.js";
import {
  addPerformanceWithKPI,
  deletePerformance,
} from "./performance.controller.js";
import {
  deletePayroll,
  generateEmployeeYearlyPayroll,
} from "./payroll.controller.js";
import { deleteFeedback } from "./feedback.controller.js";
import { deleteComplaint } from "./complaint.controller.js";
import { deleteLeave, getEmployeeLeaveStatus } from "./leave.controller.js";

const clearEmployeeCache = () => {
  const cacheKeys = myCache.keys();
  cacheKeys.forEach((key) => {
    if (key.startsWith("employees:")) {
      myCache.del(key);
    }
  });
};

const bulkCreateEmployees = catchErrors(async (req, res) => {
  const employeesRecords = req.body;

  if (!Array.isArray(employeesRecords)) {
    throw new Error("Please provide an array of employee data.");
  }

  employeesRecords.forEach((employee) => {
    if (
      !employee.employeeId ||
      !employee.name ||
      !employee.dob ||
      !employee.email ||
      !employee.phoneNumber ||
      !employee.department ||
      !employee.role ||
      !employee.gender ||
      !employee.martialStatus ||
      !employee.employmentType ||
      !employee.shift ||
      !employee.salary
    ) {
      throw new Error("Please provide all required fields for each employee.");
    }
  });

  const hashedEmployeesData = await Promise.all(
    employeesRecords.map(async (employee) => {
      const hashedPassword = await bcrypt.hash("password", 10);
      return { ...employee, password: hashedPassword };
    })
  );

  const insertedEmployees = await Employee.insertMany(hashedEmployeesData);

  const result = await Employee.find({
    _id: { $in: insertedEmployees.map((emp) => emp._id) },
  })
    .populate("department", "name")
    .populate("role", "name");

  clearEmployeeCache();

  return res.status(201).json({
    success: true,
    message: `${result.length} employees uploaded successfully.`,
    employees: result,
  });
});

const createEmployee = catchErrors(async (req, res) => {
  const {
    employeeId,
    name,
    dob,
    email,
    password,
    profilePicture,
    phoneNumber,
    address,
    department,
    role,
    dateOfJoining,
    gender,
    martialStatus,
    employmentType,
    shift,
    status,
    salary,
    bankDetails,
    emergencyContact,
    leaveBalance,
    admin,
  } = req.body;

  if (
    !employeeId ||
    !name ||
    !dob ||
    !email ||
    !password ||
    !phoneNumber ||
    !address ||
    !department ||
    !role ||
    !dateOfJoining ||
    !gender ||
    !martialStatus ||
    !employmentType ||
    !shift ||
    !salary
  ) {
    throw new Error("Please provide all required fields.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const employee = await Employee.create({
    employeeId,
    name,
    dob,
    email,
    password: hashedPassword,
    profilePicture,
    phoneNumber,
    address,
    department,
    role,
    dateOfJoining,
    gender,
    martialStatus,
    employmentType,
    shift,
    status: status || "Active",
    salary,
    bankDetails,
    emergencyContact,
    leaveBalance: leaveBalance || 0,
    admin: admin || false,
  });

  await addPerformanceWithKPI(employee._id);
  await generateEmployeeYearlyPayroll(employee);
  clearEmployeeCache();

  return res.status(201).json({
    success: true,
    message: "Employee created successfully",
    employee,
  });
});

const getAllEmployees = catchErrors(async (req, res) => {
  const { role, name, department, status, page = 1, limit = 12 } = req.query;

  const cacheKey = `employees:${role || "all"}:${name || "all"}:${
    department || "all"
  }:${status || "all"}:page${page}:limit${limit}`;

  const cachedData = myCache.get(cacheKey);
  if (cachedData) {
    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully (from cache)",
      ...cachedData,
    });
  }

  const query = {};
  if (role) query.role = role;
  if (status && status !== "On Leave") query.status = status;
  if (department) query.department = department;
  if (name) query.name = { $regex: name, $options: "i" };

  const pageNumber = Math.max(parseInt(page), 1);
  const limitNumber = Math.max(parseInt(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  let employees = await Employee.find(query)
    .populate("department", "name")
    .populate("role", "name")
    .select("-password")
    .skip(skip)
    .limit(limitNumber)
    .lean();

  employees = await Promise.all(
    employees.map(async (emp) => {
      const leaveStatus = await getEmployeeLeaveStatus(emp._id);
      return {
        ...emp,
        status: leaveStatus === "On Leave" ? "On Leave" : emp.status,
      };
    })
  );

  if (status === "On Leave") {
    employees = employees.filter((emp) => emp.status === "On Leave");
  }

  const totalEmployees = await Employee.countDocuments(query);
  const totalPages = Math.ceil(totalEmployees / limitNumber);

  const responseData = {
    employees,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalEmployees,
      limit: limitNumber,
    },
  };

  myCache.set(cacheKey, responseData);

  return res.status(200).json({
    success: true,
    message: "Employees fetched successfully",
    ...responseData,
  });
});

const getEmployeeById = catchErrors(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Please provide employee Id");

  const employee = await Employee.findById(id)
    .populate("department", "name")
    .populate("role", "name")
    .select("-password");

  return res.status(200).json({
    success: true,
    message: "Employee fetched successfuly",
    employee,
  });
});

const deleteEmployee = catchErrors(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Please provide employee Id");

  await Employee.findByIdAndDelete(id);

  await Promise.all([
    deleteLeave(id),
    deletePayroll(id),
    deleteFeedback(id),
    deleteComplaint(id),
    deletePerformance(id),
  ]);

  myCache.del("insights");
  clearEmployeeCache();

  return res.status(200).json({
    success: true,
    message: "Employee deleted successfuly",
  });
});

const updateEmployee = catchErrors(async (req, res) => {
  const { id } = req.params;
  const {
    employeeId,
    name,
    dob,
    email,
    profilePicture,
    phoneNumber,
    address,
    department,
    role,
    dateOfJoining,
    gender,
    martialStatus,
    employmentType,
    shift,
    status,
    salary,
    bankDetails,
    emergencyContact,
    leaveBalance,
    admin,
  } = req.body;

  if (!id) throw new Error("Please provide employee Id");

  const employee = await Employee.findByIdAndUpdate(
    id,
    {
      employeeId,
      name,
      dob,
      email,
      profilePicture,
      phoneNumber,
      address,
      department,
      role,
      dateOfJoining,
      gender,
      martialStatus,
      employmentType,
      shift,
      status,
      salary,
      bankDetails,
      emergencyContact,
      leaveBalance,
      admin,
    },
    { new: true }
  );

  myCache.del("insights");
  clearEmployeeCache();

  return res.status(200).json({
    success: true,
    message: "Employee updated successfuly",
    employee,
  });
});

const updateProfile = catchErrors(async (req, res) => {
  const id = req.user;
  const { name, email } = req.body;

  if (!name || !email) throw new Error("Please provide all fields");

  const employee = await Employee.findById(id);

  if (
    req.file &&
    employee.profilePicture !== `${process.env.CLIENT_URL}/unknown.jpeg`
  ) {
    const publicId = getPublicIdFromUrl(employee.profilePicture);
    if (publicId) {
      const res = await cloudinary.v2.uploader.destroy(`uploads/${publicId}`);

      if (res.result !== "ok") throw new Error("Id" + res.result);
    } else throw new Error("Invalid Cloudinary id");
  }

  employee.name = name;
  employee.email = email;
  if (req.file) employee.profilePicture = req.file.path;

  await employee.save();

  return res.status(200).json({
    success: true,
    message: "Profile picture updated",
    updatedProfile: {
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      position: employee.role,
      department: employee.department,
      employeeId: employee.employeeId,
      profilePicture: employee.profilePicture,
      authority: employee.admin ? "admin" : "employee",
    },
  });
});

export {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
  updateProfile,
  bulkCreateEmployees,
};
