import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI);

async function getPredictionFromGeminiAI(input) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
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
