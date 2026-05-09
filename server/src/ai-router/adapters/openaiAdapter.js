import OpenAI from "openai";

const openaiAdapter = {
  async generateResponse(prompt, modelId) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured.");
    }
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: modelId,
      });
      return completion.choices[0].message.content;
    } catch (error) {
      console.error("OpenAIAdapter Error:", error.message);
      throw error;
    }
  }
};

export default openaiAdapter;
