import mongoose from "mongoose";

const aiModelSchema = new mongoose.Schema(
  {
    model_id: {
      type: String,
      required: true,
      unique: true, // e.g., 'gpt-4o'
    },
    provider: {
      type: String,
      enum: ["gemini", "openai", "anthropic"],
      required: true,
    },
    model_name: {
      type: String,
      required: true, // e.g., 'GPT-4 Omni'
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    default_for_system: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const AIModel = mongoose.model("AIModel", aiModelSchema);

export default AIModel;
