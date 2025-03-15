import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://metrohrms.netlify.app/unknown.jpeg",
    },
    qrCode: String,
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    dateOfJoining: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    martialStatus: {
      type: String,
      enum: ["Single", "Married"],
      required: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract"],
      required: true,
    },
    shift: {
      type: String,
      enum: ["Morning", "Evening", "Night"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Leave"],
      default: "Active",
    },
    salary: {
      type: Number,
      required: true,
    },
    bankDetails: {
      accountNumber: String,
      bankName: String,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phoneNumber: String,
    },
    leaveBalance: {
      type: Number,
      default: 0,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    forgetPasswordToken: String,
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
