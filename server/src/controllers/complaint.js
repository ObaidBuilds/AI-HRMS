import Complaint from "../models/complaint.js";
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
  const { complainType, complaintDetails, complainSubject } = req.body;
  const employee = req.user;

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

const respondComplaint = catchErrors(async (req, res) => {
  const { status } = req.query;
  const { complaintID } = req.params;
  const { remarks } = req.body;

  if (!status || !complaintID) throw new Error("All fields are required");

  const complaint = await Complaint.findById(complaintID);

  if (!complaint) throw new Error("Complaint not found");
  if (complaint.status === "Resolved")
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

export { getComplaints, createComplaint, respondComplaint };
