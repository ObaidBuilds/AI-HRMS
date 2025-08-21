import Leave from "../models/leave.model.js";
import { catchErrors } from "../utils/index.js";
import Complaint from "../models/complaint.model.js";
import Update from "../models/update.model.js";

const createUpdate = async ({ employee, type, status, remarks }) => {
  await Update.create({ employee, type, status, remarks });
};

const getUpdates = catchErrors(async (req, res) => {
  const employee = req.user.id;

  const updates = await Update.find({ employee })
    .populate({
      path: "employee",
      select: "name employeeId department role",
      populate: [
        {
          path: "department",
          select: "name",
        },
        {
          path: "role",
          select: "name",
        },
      ],
    })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Updates fetched successfully",
    updates,
  });
});

const getDate = catchErrors(async (req, res) => {
  const datetime = new Date().toISOString();

  return res.status(200).json({
    success: true,
    message: "Date fetched successfully",
    datetime,
  });
});

export { getUpdates, createUpdate, getDate };
