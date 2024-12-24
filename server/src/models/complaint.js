import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    complainType: {
      type: String,
      enum: ["Harassment", "Discrimination", "Workplace Conflict", "Other"],
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
      enum: ["Pending", "Resolved", "Closed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;
