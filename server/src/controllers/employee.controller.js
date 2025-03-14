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
import { createPayrollForEmployee } from "./payroll.controller.js";

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
  await createPayrollForEmployee({ employee });
  return res.status(201).json({
    success: true,
    message: "Employee created successfully",
    employee,
  });
});

const getAllEmployees = catchErrors(async (req, res) => {
  const { role, name, department, status, page = 1, limit = 15 } = req.query;

  const query = {};

  if (role) query.role = role;
  if (status) query.status = status;
  if (department) query.department = department;
  if (name) query.name = { $regex: name, $options: "i" };

  const pageNumber = Math.max(parseInt(page), 1);
  const limitNumber = Math.max(parseInt(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const employees = await Employee.find(query)
    .populate("department", "name")
    .populate("role", "name")
    .select("-password")
    .skip(skip)
    .limit(limitNumber);

  const totalEmployees = await Employee.countDocuments(query);
  const totalPages = Math.ceil(totalEmployees / limitNumber);

  return res.status(200).json({
    success: true,
    message: "Employees fetched successfully",
    employees,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalEmployees,
      limit: limitNumber,
    },
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

  await deletePerformance(id);

  myCache.del("insights");

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

  return res.status(200).json({
    success: true,
    message: "Employee updated successfuly",
    employee,
  });
});

const updateProfilePicture = catchErrors(async (req, res) => {
  const id = req.user;

  if (!req.file) throw new Error("Please provide profile pic");

  const employee = await Employee.findById(id);

  if (employee.profilePicture) {
    const publicId = getPublicIdFromUrl(employee.profilePicture);

    if (publicId) {
      const res = await cloudinary.v2.uploader.destroy(`uploads/${publicId}`);

      if (res.result !== "ok") throw new Error("Id" + res.result);
    } else throw new Error("Invalid Cloudinary id");
  }

  employee.profilePicture = req.file.path;
  await employee.save();

  return res.status(200).json({
    success: true,
    message: "Profile picture updated",
    updatedProfilePicture: employee.profilePicture,
  });
});

export {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
  updateProfilePicture,
  bulkCreateEmployees,
};
