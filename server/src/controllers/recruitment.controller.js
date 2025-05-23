import Recruitment from "../models/recruitment.model.js";
import { catchErrors } from "../utils/index.js";

const createJob = catchErrors(async (req, res) => {
  const postedBy = req.user;
  const {
    title,
    department,
    role,
    location,
    type,
    description,
    requirements,
    deadline,
    minSalary,
    maxSalary,
  } = req.body;

  if (!title || !description || !type)
    throw new Error("Please provide all required fields");

  const job = await Recruitment.create({
    title,
    department,
    role,
    location,
    type,
    description,
    requirements,
    deadline,
    postedBy,
    minSalary,
    maxSalary,
  });

  return res.status(201).json({
    success: true,
    message: "Job created successfully",
    job,
  });
});

const getAllJobs = catchErrors(async (req, res) => {
  const { status, deadline } = req.query;

  const query = {};
  if (status) query.status = { $regex: status, $options: "i" };
  if (deadline) {
    const deadlineDate = new Date(deadline);
    query.deadline = { $gte: deadlineDate };
  }

  const jobs = await Recruitment.find(query)
    .populate([
      { path: "department", select: "name" },
      { path: "role", select: "name" },
    ])
    .sort({ postedAt: -1 });

  return res.status(200).json({
    success: true,
    jobs,
  });
});

const getJobApplications = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;

  const job = await Recruitment.findById(id).populate([
    { path: "department", select: "name" },
    { path: "role", select: "name" },
  ]);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  let applicants = job.applicants;

  if (status) {
    applicants = applicants.filter(
      (applicant) => applicant.status?.toLowerCase() === status.toLowerCase()
    );
  }

  applicants.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));

  return res.status(200).json({
    success: true,
    message: "Applicants fetch successfully",
    applicants,
  });
});

const getJobById = catchErrors(async (req, res) => {
  const { id } = req.params;

  const job = await Recruitment.findById(id);

  if (!job) throw new Error("Job not found");

  return res.status(200).json({
    success: true,
    job,
  });
});

const updateJobStatus = catchErrors(async (req, res) => {
  const { status } = req.body;
  if (!status) throw new Error("Status is required");

  const job = await Recruitment.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  if (!job) throw new Error("Job not found");

  return res.status(200).json({
    success: true,
    message: "Job status updated",
    job,
  });
});

const createApplicant = catchErrors(async (req, res) => {
  const { name, email, phone, coverLetter } = req.body;

  if (!name || !email || !phone || !req.file)
    throw new Error("Please provide all application field");

  const job = await Recruitment.findById(req.params.id);
  if (!job) throw new Error("Job not found");

  if (job.deadline < Date.now())
    throw new Error("Job expired, deadline reached");

  job.applicants.push({
    name,
    email,
    phone,
    resume: req.file.path,
    coverLetter,
  });
  await job.save();

  return res.status(201).json({
    success: true,
    message: "Application sent successfully",
  });
});

export {
  createJob,
  createApplicant,
  updateJobStatus,
  getAllJobs,
  getJobById,
  getJobApplications,
};
