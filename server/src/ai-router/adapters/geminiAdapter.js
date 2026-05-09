import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiAdapter = {
  async generateResponse(prompt, modelId) {
    if (!process.env.GEMINI) {
      throw new Error("GEMINI key is not configured.");
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI);
    const model = genAI.getGenerativeModel({ model: modelId });
    
    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      return await response.text();
    } catch (error) {
      console.error("GeminiAdapter Error:", error.message);
      throw error;
    }
  }
};

export default geminiAdapter;
