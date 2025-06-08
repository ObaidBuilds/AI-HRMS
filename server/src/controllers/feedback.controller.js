import Feedback from "../models/feedback.model.js";
import { catchErrors, myCache } from "../utils/index.js";
import { getSentimentAnalysis } from "../predictions/index.js";

const getFeedbacks = catchErrors(async (req, res) => {
  const { review, page = 1, limit = 15 } = req.query;

  const cacheKey = `feedbacks:${review || "all"}:page${page}:limit${limit}`;

  const cachedData = myCache.get(cacheKey);
  if (cachedData) {
    return res.status(200).json({
      success: true,
      message: "Feedback fetched successfully (from cache)",
      ...cachedData,
    });
  }

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
    .sort({ createdAt: -1 })
    .lean();

  const totalFeedbacks = await Feedback.countDocuments(query);
  const totalPages = Math.ceil(totalFeedbacks / limitNumber);

  const responseData = {
    feedback,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalFeedbacks,
      limit: limitNumber,
    },
  };

  myCache.set(cacheKey, responseData);

  return res.status(200).json({
    success: true,
    message: "Feedback fetched successfully",
    ...responseData,
  });
});

const createFeedback = catchErrors(async (req, res) => {
  const { description, rating, suggestion } = req.body;
  const employee = req.user;

  if (!employee || !description || !rating)
    throw new Error("All fields are required");

  const review = await getSentimentAnalysis(
    description,
    parseInt(rating)
  );

  const feedback = await Feedback.create({
    employee,
    description,
    rating: parseInt(rating),
    review,
    suggestion,
  });

  myCache.del("insights");
  const cacheKeys = myCache.keys();
  cacheKeys.forEach((key) => {
    if (key.startsWith("feedbacks:")) {
      myCache.del(key);
    }
  });

  return res.status(201).json({
    success: true,
    message: "Feedback created successfully",
    feedback,
  });
});

const deleteFeedback = async (employee) => {
  if (!employee) throw new Error("Please provide employee Id");

  const feedback = await Feedback.deleteOne({ employee });

  if (feedback.deletedCount) return;

  return "Feedback deleted successfuly";
};

export { getFeedbacks, createFeedback, deleteFeedback };
