import axiosInstance from "../axios/axiosInstance";

// Fetch AI Models
export const fetchAIModels = async () => {
  try {
    const { data } = await axiosInstance.get("/ai_models");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data.message || "Failed to fetch AI models");
  }
};

// Chat with AI
export const chatWithAI = async (prompt, modelId, setLoading) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.post("/insights/chat", { prompt, modelId });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data.message || "Failed to chat");
  } finally {
    setLoading(false);
  }
};
