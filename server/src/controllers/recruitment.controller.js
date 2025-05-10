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
  const { status } = req.query;

  const query = {};
  if (status) query.status = { $regex: status, $options: "i" };

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

  if (!name || !email || !req.file)
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
    message: "Applicant sent successfully",
    job,
  });
});

export { createJob, createApplicant, updateJobStatus, getAllJobs, getJobById };
