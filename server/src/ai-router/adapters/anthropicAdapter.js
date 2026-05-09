import Anthropic from "@anthropic-ai/sdk";

const anthropicAdapter = {
  async generateResponse(prompt, modelId) {
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY is not configured.");
    }
    
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    
    try {
      const msg = await anthropic.messages.create({
        model: modelId,
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      });
      return msg.content[0].text;
    } catch (error) {
      console.error("AnthropicAdapter Error:", error.message);
      throw error;
    }
  }
};

export default anthropicAdapter;
