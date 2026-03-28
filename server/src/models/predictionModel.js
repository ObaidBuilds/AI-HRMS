import mongoose from "mongoose";

const predictionModelSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true },
    modelName: { type: String, required: true },
    customName: { type: String },
    status: {
      type: String,
      enum: ["active", "disabled", "deprecated"],
      default: "active",
    },
    type: { type: String },
  },
  {
    timestamps: true,
  },
);

const PredictionModel = mongoose.model(
  "PredictionModel",
  predictionModelSchema,
);

export default PredictionModel;
