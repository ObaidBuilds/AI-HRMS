import getPredictionFromGeminiAI from "../gemini/index.js";
import Feedback from "../models/feedback.js";
import { catchErrors, getSentimentAnalysis } from "../utils/index.js";

const getFeedbacks = catchErrors(async (req, res) => {
  const { review } = req.query;

  const query = {};

  if (review) query.review = { $regex: review, $options: "i" };

  const feedback = await Feedback.find(query).populate({
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
  });

  return res.status(200).json({
    success: true,
    message: "Feedback fetched successfully",
    feedback,
  });
});

const createFeedback = catchErrors(async (req, res) => {
  const { employee, description, rating } = req.body;

  if (!employee || !description || !rating)
    throw new Error("All fields are required");

  const prompt = `
  Given the user's feedback description and rating, determine if the sentiment is positive or negative. 
  The rating should be considered as an additional indicator. 
  Feedback Description: "${description}" 
  Rating: ${rating} 
  Please respond with only one word which is "Positive" , "Negative" or "Neutral".
`;

  let review;
  review = await getPredictionFromGeminiAI(prompt);

  if (!review) review = getSentimentAnalysis();

  const feedback = await Feedback.create({
    employee,
    description,
    rating,
    review,
  });

  return res.status(200).json({
    success: true,
    message: "Feedback created successfully",
    feedback,
  });
});

export { getFeedbacks, createFeedback };
