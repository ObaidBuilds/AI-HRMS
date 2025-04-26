import { myCache } from "../utils/index.js";
import { catchErrors } from "../utils/index.js";
import Department from "../models/department.model.js";
import Employee from "../models/employee.model.js";

const createDepartment = catchErrors(async (req, res) => {
  const { name, head, description } = req.body;

  if (!name || !head) throw new Error("Please provide all fields");

  const department = await Department.create({
    name,
    head,
    description,
  });

  await department.populate("head", "name");

  myCache.del("insights");
  myCache.del("department");

  return res.status(201).json({
    success: true,
    message: "Department created successfuly",
    department,
  });
});

const getAllDepartments = catchErrors(async (req, res) => {
  const cacheKey = "department";

  const cachedDepartments = myCache.get(cacheKey);
  if (cachedDepartments) {
    return res.status(200).json({
      success: true,
      message: "Departments fetched successfully (from cache)",
      department: cachedDepartments,
    });
  }

  const department = await Department.find().populate("head", "name").lean();

  myCache.set(cacheKey, department);

  if (!department) throw new Error("No departments found");

  return res.status(201).json({
    success: true,
    message: "Departments fetched successfully",
    department,
  });
});

const getAllEmployeesForHead = catchErrors(async (req, res) => {
  const employees = await Employee.find().select("name");

  if (employees.length === 0) throw new Error("No employee found");

  return res.status(201).json({
    success: true,
    message: "Employees fetched successfully",
    employees,
  });
});

const getDepartmentById = catchErrors(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Please provide departmed Id");

  const department = await Department.findById(id).populate("head");

  return res.status(201).json({
    success: true,
    message: "Department fetched successfuly",
    department,
  });
});

const getDepartmentEmployees = catchErrors(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Please provide departmed Id");

  const department = await Department.findById(id).populate("head", "name");

  return res.status(201).json({
    success: true,
    message: "Department fetched successfuly",
    department,
  });
});

const deleteDepartment = catchErrors(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Please provide departmed Id");

  await Department.findByIdAndDelete(id);

  myCache.del("insights");
  myCache.del("department");

  return res.status(201).json({
    success: true,
    message: "Department deleted successfuly",
  });
});

const updateDepartment = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { name, head, description } = req.body;

  if (!id) throw new Error("Please provide departmed Id");

  const department = await Department.findByIdAndUpdate(
    id,
    { name, head, description },
    { new: true }
  ).populate("head", "name");

  myCache.del("insights");
  myCache.del("department");

  return res.status(201).json({
    success: true,
    message: "Department updated successfuly",
    department,
  });
});

export {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  getDepartmentEmployees,
  deleteDepartment,
  updateDepartment,
  getAllEmployeesForHead,
};
