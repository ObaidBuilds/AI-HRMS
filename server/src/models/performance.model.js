import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  kpis: {
    taskCompletion: {
      type: Number,
      required: true,
    },
    attendance: {
      type: Number,
      required: true,
    },
    deadlinesMet: {
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
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Performance = mongoose.model("Performance", performanceSchema);

export default Performance;
