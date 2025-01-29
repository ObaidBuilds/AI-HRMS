import Complaint from "../models/complaint.model.js";
import { catchErrors, myCache } from "../utils/index.js";

const getComplaints = catchErrors(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const query = {};

  if (status) query.status = { $regex: status, $options: "i" };

  const pageNumber = Math.max(parseInt(page), 1);
  const limitNumber = Math.max(parseInt(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const complaint = await Complaint.find(query)
    .sort({ createdAt: -1 })
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
    .skip(skip)
    .limit(limitNumber);

  const totalComplaints = await Complaint.countDocuments(query);
  const totalPages = Math.ceil(totalComplaints / limitNumber);

  return res.status(200).json({
    success: true,
    message: "Complaint fetched successfully",
    complaint,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalComplaints,
      limit: limitNumber,
    },
  });
});

const createComplaint = catchErrors(async (req, res) => {
  const employee = req.user;
  const { complainType, complaintDetails, complainSubject } = req.body;

  if (!employee || !complainType || !complaintDetails || !complainSubject)
    throw new Error("All fields are required");

  const complaint = await Complaint.create({
    employee,
    complainType,
    complainSubject,
    complaintDetails,
  });

  myCache.del("insights");

  return res.status(200).json({
    success: true,
    message: "Complaint created successfully",
    complaint,
  });
});

const assignComplaintForResolution = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { employee } = req.body;

  if (!id || !employee) throw new Error("All fields are required");

  const updatedComplaint = await Complaint.findByIdAndUpdate(
    id,
    { assignComplaint: employee },
    { new: true }
  ).populate("assignComplaint", "name email");

  if (!updatedComplaint) throw new Error("Complaint not found");

  res.status(200).json({
    success: true,
    message: "Complaint successfully assigned for resolution.",
    complaint: updatedComplaint,
  });
});

const respondComplaint = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { remarks, status } = req.body;

  if (!status || !id) throw new Error("All fields are required");

  const complaint = await Complaint.findById(id);

  if (!complaint) throw new Error("Complaint not found");
  if (complaint.status.toLowerCase() === "resolved")
    throw new Error("Complaint already resolved");

  complaint.status = status;

  if (remarks) complaint.remarks = remarks;

  await complaint.save();

  myCache.del("insights");

  return res.status(200).json({
    success: true,
    message: `Complaint ${status.toLowerCase()} successfully`,
    complaint,
  });
});

export {
  getComplaints,
  createComplaint,
  respondComplaint,
  assignComplaintForResolution,
};
