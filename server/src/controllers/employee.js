import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Employee from "../models/employee.js";
import { catchErrors, getPublicIdFromUrl } from "../utils/index.js";
import bcrypt from "bcrypt";
import { myCache } from "../utils/index.js";
import cloudinary from "cloudinary";

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

  return res.status(201).json({
    success: true,
    message: "Employee created successfully",
    employee,
  });
});

const getAllEmployees = catchErrors(async (req, res) => {
  const { role, name, department, status, page = 1, limit = 10 } = req.query;

  const query = {};

  if (status) query.status = status;
  if (name) query.name = { $regex: name, $options: "i" };
  if (role && mongoose.Types.ObjectId.isValid(role)) query.role = role;
  if (department && mongoose.Types.ObjectId.isValid(department))
    query.department = department;

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
  const { employeeID } = req.params;

  if (!employeeID) throw new Error("Please provide employee Id");

  const employee = await Employee.findById(employeeID)
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
  const { employeeID } = req.params;

  if (!employeeID) throw new Error("Please provide employee Id");

  await Employee.findByIdAndDelete(employeeID);

  myCache.del("insights");

  return res.status(200).json({
    success: true,
    message: "Employee deleted successfuly",
  });
});

const updateEmployee = catchErrors(async (req, res) => {
  const { employeeID } = req.params;
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

  if (!employeeID) throw new Error("Please provide employee Id");

  const employee = await Employee.findByIdAndUpdate(
    employeeID,
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

    if (publicId) await cloudinary.v2.uploader.destroy(publicId);
    else throw new Error("Invalid Cloudinary id");
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
};
