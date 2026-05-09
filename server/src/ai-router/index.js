import AIModel from "../models/aiModel.model.js";
import Employee from "../models/employee.model.js";
import geminiAdapter from "./adapters/geminiAdapter.js";
import openaiAdapter from "./adapters/openaiAdapter.js";
import anthropicAdapter from "./adapters/anthropicAdapter.js";

const adapters = {
  gemini: geminiAdapter,
  openai: openaiAdapter,
  anthropic: anthropicAdapter,
};

async function getPredictionFromAI(prompt, modelId, userId) {
  let selectedModel;

  // 1. If a specific modelId is requested by the client
  if (modelId) {
    selectedModel = await AIModel.findOne({ model_id: modelId, is_active: true });
  }

  // 2. If no modelId or requested model is inactive/not found, check user preference
  if (!selectedModel && userId) {
    const user = await Employee.findById(userId).populate("ai_settings.preferred_model_id");
    if (user?.ai_settings?.preferred_model_id?.is_active) {
      selectedModel = user.ai_settings.preferred_model_id;
    }
  }

  // 3. If still no model, use system default
  if (!selectedModel) {
    selectedModel = await AIModel.findOne({ default_for_system: true, is_active: true });
  }

  // 4. Ultimate fallback if nothing is found (hardcoded)
  if (!selectedModel) {
    selectedModel = {
      model_id: "gemini-2.5-flash", // updated based on constant
      provider: "gemini",
    };
  }

  const adapter = adapters[selectedModel.provider];
  if (!adapter) {
    throw new Error(`Provider adapter for ${selectedModel.provider} not found.`);
  }

  try {
    return await adapter.generateResponse(prompt, selectedModel.model_id);
  } catch (error) {
    console.error(`[AI Router Error] Provider: ${selectedModel.provider}, Model: ${selectedModel.model_id}`, error.message || error);
    throw new Error(`AI service is currently unavailable for ${selectedModel.model_name}. Please try again later or select another model.`);
  }
}

export default getPredictionFromAI;
