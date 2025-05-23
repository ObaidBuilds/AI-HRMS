import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  resume: String,
  coverLetter: String,
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Applied", "Under Review", "Interview", "Rejected", "Hired"],
    default: "Applied",
  },
});

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  location: String,
  minSalary: String,
  maxSalary: String,
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract"],
    default: "full-time",
  },
  description: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  deadline: Date,
  applicants: [applicantSchema],
  status: {
    type: String,
    enum: ["Open", "Closed", "Paused"],
    default: "Open",
  },
});

const Recruitment = mongoose.model("Job", jobSchema);

export default Recruitment;
