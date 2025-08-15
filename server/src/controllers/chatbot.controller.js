import { catchErrors } from "../utils/index.js";
import { getAnswerFromChatbot } from "../predictions/index.js";

const answerAdminQuery = catchErrors(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) throw new Error("Please provide a query");

  const response = await getAnswerFromChatbot(prompt);

  return res.status(200).json({
    success: true,
    message: "Gemini replied successfully",
    response: response || "⚠️ Failed to generate response, Try again later",
  });
});

export default answerAdminQuery;
