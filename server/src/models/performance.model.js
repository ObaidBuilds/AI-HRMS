import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    kpis: {
      attendance: {
        type: Number,
        required: true,
      },
    },
    kpiScore: {
      type: Number,
      default: 0,
    },
    feedback: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Performance = mongoose.model("Performance", performanceSchema);

export default Performance;
