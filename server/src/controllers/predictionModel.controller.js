import PredictionModel from "../models/predictionModel.js";
import { myCache, catchErrors } from "../utils/index.js";

const createPredictionModel = catchErrors(async (req, res) => {
  const { owner, modelName, customName, status, type } = req.body;

  if (!owner || !modelName || !customName || !status || !type)
    throw new Error("Please provide owner and modelName");

  const predictionModel = await PredictionModel.create({
    owner,
    modelName,
    customName,
    status,
    type,
  });

  myCache.del("predictionModels");

  return res.status(201).json({
    success: true,
    message: "Prediction model created successfully",
    predictionModel,
  });
});

const getAllPredictionModels = catchErrors(async (req, res) => {
  const { modelName } = req.query;
  const cacheKey = modelName
    ? `predictionModel:${modelName.toLowerCase()}`
    : "predictionModel:all";

  const cachedModels = myCache.get(cacheKey);
  if (cachedModels) {
    return res.status(200).json({
      success: true,
      message: "Prediction models fetched successfully (from cache)",
      predictionModels: cachedModels,
    });
  }

  const query = {};
  if (modelName) query.modelName = { $regex: modelName, $options: "i" };

  const predictionModels = await PredictionModel.find(query).lean();
  if (!predictionModels || predictionModels.length === 0) {
    throw new Error("No prediction models found");
  }

  myCache.set(cacheKey, predictionModels);

  return res.status(200).json({
    success: true,
    message: "Prediction models fetched successfully",
    predictionModels,
  });
});

const getPredictionModelById = catchErrors(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Please provide prediction model ID");

  const predictionModel = await PredictionModel.findById(id);

  if (!predictionModel) throw new Error("Prediction model not found");

  return res.status(200).json({
    success: true,
    message: "Prediction model fetched successfully",
    predictionModel,
  });
});

const updatePredictionModel = catchErrors(async (req, res) => {
  const { id } = req.params;
  const { owner, modelName, customName, status, type } = req.body;

  if (!id) throw new Error("Please provide prediction model ID");

  const predictionModel = await PredictionModel.findByIdAndUpdate(
    id,
    { owner, modelName, customName, status, type },
    { new: true },
  );

  if (!predictionModel) throw new Error("Prediction model not found");

  myCache.del("predictionModels");

  return res.status(200).json({
    success: true,
    message: "Prediction model updated successfully",
    predictionModel,
  });
});

const deletePredictionModel = catchErrors(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Please provide prediction model ID");

  await PredictionModel.findByIdAndDelete(id);

  myCache.del("predictionModels");

  return res.status(200).json({
    success: true,
    message: "Prediction model deleted successfully",
  });
});

export {
  createPredictionModel,
  getAllPredictionModels,
  getPredictionModelById,
  updatePredictionModel,
  deletePredictionModel,
};
