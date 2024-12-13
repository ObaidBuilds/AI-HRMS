import Department from "../models/department.js";
import { catchErrors } from "../utils/index.js";

const createDepartment = catchErrors(async (req, res) => {
  const { name, head } = req.body;

  if (!name || !head ) throw new Error("Please provide all fields");

  const department = await Department.create({ name, head });

  return res.status(201).json({
    success: true,
    message: "Department created successfuly",
    department,
  });
});

const getAllDepartments = catchErrors(async (req, res) => {
  const { name, head } = req.query;

  const query = {};

  if (name) query.name = { $regex: name, $options: "i" };
  if (head) query.head = { $regex: head, $options: "i" };

  const department = await Department.find(query).populate("head", "name");

  return res.status(201).json({
    success: true,
    message: "Departments fetched successfuly",
    department,
  });
});

const getDepartmentById = catchErrors(async (req, res) => {
  const { departmentID } = req.params;

  if (!departmentID) throw new Error("Please provide departmed Id");

  const department = await Department.findById(departmentID).populate("head");

  return res.status(201).json({
    success: true,
    message: "Department fetched successfuly",
    department,
  });
});

const getDepartmentEmployees = catchErrors(async (req, res) => {
  const { departmentID } = req.params;

  if (!departmentID) throw new Error("Please provide departmed Id");

  const department = await Department.findById(departmentID).populate(
    "head",
    "name"
  );

  return res.status(201).json({
    success: true,
    message: "Department fetched successfuly",
    department,
  });
});

const deleteDepartment = catchErrors(async (req, res) => {
  const { departmentID } = req.params;

  if (!departmentID) throw new Error("Please provide departmed Id");

  await Department.findByIdAndDelete(departmentID);

  return res.status(201).json({
    success: true,
    message: "Department deleted successfuly",
  });
});

const updateDepartment = catchErrors(async (req, res) => {
  const { departmentID } = req.params;
  const { name, head } = req.body;

  if (!departmentID) throw new Error("Please provide departmed Id");

  const department = await Department.findByIdAndUpdate(
    departmentID,
    { name, head },
    { new: true }
  );

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
