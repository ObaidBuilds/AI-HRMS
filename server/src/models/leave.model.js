import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    leaveType: {
      type: String,
      required: true,
    },
    remarks : {
        type: String,
        default : ""
    },
    substitute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    application: {
      type: String,
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    duration : {
        type: Number,
        required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.model("Leave", leaveSchema);

export default Leave;
