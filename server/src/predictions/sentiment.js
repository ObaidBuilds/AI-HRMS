import getPredictionFromGeminiAI from "../gemini/index.js";

/** Fallback sentiment analysis */
function fallbackSentimentAnalysis(rating) {
  if (rating >= 4) return "Positive";
  if (rating === 3) return "Neutral";
  return "Negative";
}

async function getSentimentAnalysis(description, rating) {
  const prompt = `
  Given user feedback: "${description}"
  Classify sentiment as one of "Positive", "Negative", or "Neutral" (single word only).
  `;

  try {
    const response = await getPredictionFromGeminiAI(prompt);
    if (response) return response;
  } catch (error) {
    console.error("Gemini AI sentiment error:", error.message);
  }
  return fallbackSentimentAnalysis(rating);
}

export default getSentimentAnalysis;
