import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    complainType: {
      type: String,
      required: true,
      enum: [
        "Workplace",
        "Payroll",
        "Leave",
        "Harassment",
        "Scheduling",
        "Misconduct",
      ],
    },
    complainSubject: {
      type: String,
      required: true,
    },
    complaintDetails: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
    assignComplaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);
  
export default Complaint;
