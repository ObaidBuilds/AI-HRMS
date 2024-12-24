import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI);

async function getPredictionFromGeminiAI(input) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(input);
    const response = result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.log(error.message);
  }
}

export default getPredictionFromGeminiAI;
