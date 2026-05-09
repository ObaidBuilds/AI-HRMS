import { catchErrors } from "../utils/index.js";
import AIModel from "../models/aiModel.model.js";

export const getAvailableModels = catchErrors(async (req, res) => {
  const models = await AIModel.find({ is_active: true }).select("model_id model_name provider");
  return res.status(200).json({
    success: true,
    data: models,
  });
});
