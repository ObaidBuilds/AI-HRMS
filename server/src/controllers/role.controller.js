import Role from "../models/role.model.js";
import { myCache } from "../utils/index.js";
import { catchErrors } from "../utils/index.js";

const createRole = catchErrors(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) throw new Error("Please provide all fields");

  const role = await Role.create({ name, description });

  myCache.del("insights");
  myCache.del("role");

  return res.status(201).json({
    success: true,
    message: "Role created successfuly",
    role,
  });
});

const getAllRoles = catchErrors(async (req, res) => {
  const { name } = req.query;

  const cacheKey = name ? `role:${name.toLowerCase()}` : "role:all";

  const cachedRoles = myCache.get(cacheKey);
  if (cachedRoles) {
    return res.status(200).json({
      success: true,
      message: "Roles fetched successfully (from cache)",
      role: cachedRoles,
    });
  }

  const query = {};
  if (name) query.name = { $regex: name, $options: "i" };

  const roles = await Role.find(query).lean();

  if (!roles || roles.length === 0) {
    throw new Error("No roles found");
  }

  myCache.set(cacheKey, roles);

  return res.status(200).json({
    success: true,
    message: "Roles fetched successfully",
    role: roles,
  });
});

const getRoleById = catchErrors(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Please provide role Id");

  const role = await Role.findById(id).populate({
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
  const { id } = req.params;

  if (!id) throw new Error("Please provide role Id");

  await Role.findByIdAndDelete(id);

  myCache.del("insights");
  myCache.del("department");

  return res.status(201).json({
    success: true,
    message: "Role deleted successfuly",
  });
});

const updateRole = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!id) throw new Error("Please provide role Id");

  const role = await Role.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  );

  myCache.del("insights");
  myCache.del("department");

  return res.status(201).json({
    success: true,
    message: "Department updated successfuly",
    role,
  });
});

export { createRole, getAllRoles, getRoleById, deleteRole, updateRole };
