import { myCache } from "../index.js";
import Role from "../models/role.js";
import { catchErrors } from "../utils/index.js";

const createRole = catchErrors(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) throw new Error("Please provide all fields");

  const role = await Role.create({ name, description });

  myCache.del("insights");

  return res.status(201).json({
    success: true,
    message: "Role created successfuly",
    role,
  });
});

const getAllRoles = catchErrors(async (req, res) => {
  const { name } = req.query;

  const query = {};

  if (name) query.name = { $regex: name, $options: "i" };

  const role = await Role.find(query);

  return res.status(201).json({
    success: true,
    message: "Roles fetched successfuly",
    role,
  });
});

const getRoleById = catchErrors(async (req, res) => {
  const { roleID } = req.params;

  if (!roleID) throw new Error("Please provide role Id");

  const role = await Role.findById(roleID).populate({
    path: "department",
    select: "name",
    populate: {
      path: "head",
      select: "name",
    },
  });

  return res.status(201).json({
    success: true,
    message: "role fetched successfuly",
    role,
  });
});

const deleteRole = catchErrors(async (req, res) => {
  const { roleID } = req.params;

  if (!roleID) throw new Error("Please provide role Id");

  await Role.findByIdAndDelete(roleID);

  myCache.del("insights");

  return res.status(201).json({
    success: true,
    message: "Role deleted successfuly",
  });
});

const updateRole = catchErrors(async (req, res) => {
  const { roleID } = req.params;
  const { name, description } = req.body;

  if (!roleID) throw new Error("Please provide role Id");

  const role = await Role.findByIdAndUpdate(
    roleID,
    { name, description },
    { new: true }
  );

  myCache.del("insights");

  return res.status(201).json({
    success: true,
    message: "Department updated successfuly",
    role,
  });
});

export { createRole, getAllRoles, getRoleById, deleteRole, updateRole };
