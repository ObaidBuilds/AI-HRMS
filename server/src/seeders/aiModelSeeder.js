import mongoose from "mongoose";
import dotenv from "dotenv";
import AIModel from "../models/aiModel.model.js";

dotenv.config();

const seedModels = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB for AI Model seeding");

    await AIModel.deleteMany({}); // Clear existing

    const models = [
      {
        model_id: "gemini-2.5-flash",
        provider: "gemini",
        model_name: "Gemini 2.5 Flash",
        is_active: true,
        default_for_system: true, // Default
      },
      {
        model_id: "gpt-4o",
        provider: "openai",
        model_name: "GPT-4 Omni",
        is_active: true,
        default_for_system: false,
      },
      {
        model_id: "claude-3-5-sonnet-20241022",
        provider: "anthropic",
        model_name: "Claude 3.5 Sonnet",
        is_active: true,
        default_for_system: false,
      },
    ];

    await AIModel.insertMany(models);
    console.log("AI Models seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding AI Models:", error);
    process.exit(1);
  }
};

seedModels();
