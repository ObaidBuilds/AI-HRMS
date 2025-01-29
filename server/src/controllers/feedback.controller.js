import Feedback from "../models/feedback.model.js";
import { catchErrors, myCache } from "../utils/index.js";
import getPredictionFromGeminiAI from "../gemini/index.js";
import { getSentimentAnalysis } from "../predictions/index.js";

const getFeedbacks = catchErrors(async (req, res) => {
  const { review, page = 1, limit = 10 } = req.query;

  const query = {};

  if (review) query.review = { $regex: review, $options: "i" };

  const pageNumber = Math.max(parseInt(page), 1);
  const limitNumber = Math.max(parseInt(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const feedback = await Feedback.find(query)
    .populate({
      path: "employee",
      select: "name employeeId department role",
      populate: [
        {
          path: "department",
          select: "name",
        },
        {
          path: "role",
          select: "name",
        },
      ],
    })
    .skip(skip)
    .limit(limitNumber)
    .sort({ createdAt: -1 });

  const totalFeedbacks = await Feedback.countDocuments(query);
  const totalPages = Math.ceil(totalFeedbacks / limitNumber);

  return res.status(200).json({
    success: true,
    message: "Feedback fetched successfully",
    feedback,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalFeedbacks,
      limit: limitNumber,
    },
  });
});

const createFeedback = catchErrors(async (req, res) => {
  const { description, rating, suggestion } = req.body;
  const employee = req.user;

  if (!employee || !description || !rating)
    throw new Error("All fields are required");

  const prompt = `
  Given the user's feedback description, determine if the sentiment is positive or negative. 
  The rating should be considered as an additional indicator. 
  Feedback Description: "${description}" 
  Please respond with only one word which is "Positive" , "Negative" or "Neutral".
`;

  let review;
  review = await getPredictionFromGeminiAI(prompt);

  if (!review) review = getSentimentAnalysis(parseInt(rating));

  const feedback = await Feedback.create({
    employee,
    description,
    rating: parseInt(rating),
    review,
    suggestion,
  });

  myCache.del("insights");

  return res.status(200).json({
    success: true,
    message: "Feedback created successfully",
    feedback,
  });
});

export { getFeedbacks, createFeedback };
