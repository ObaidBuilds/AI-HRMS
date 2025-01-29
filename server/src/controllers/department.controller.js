import { myCache } from "../utils/index.js";
import { catchErrors } from "../utils/index.js";
import Department from "../models/department.model.js";

const createDepartment = catchErrors(async (req, res) => {
  const { name, head } = req.body;

  if (!name || !head) throw new Error("Please provide all fields");

  const department = await Department.create({ name, head });

  myCache.del("insights");

  return res.status(201).json({
    success: true,
    message: "Department created successfuly",
    department,
  });
});

const getAllDepartments = catchErrors(async (req, res) => {
  const department = await Department.find().populate("head", "name");

  if (!department) {
    return res.status(404).json({
      success: false,
      message: "No departments found",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Departments fetched successfully",
    department,
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

  return res.status(201).json({
    success: true,
    message: "Department deleted successfuly",
  });
});

const updateDepartment = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { name, head } = req.body;

  if (!id) throw new Error("Please provide departmed Id");

  const department = await Department.findByIdAndUpdate(
    id,
    { name, head },
    { new: true }
  );

  myCache.del("insights");

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
};
