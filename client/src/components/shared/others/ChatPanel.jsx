import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { useTheme } from "../../../context";
import { useEffect, useRef, useState } from "react";
import ChatbotLoader from "../loaders/ChatbotLoader";
import { chatWithAI, fetchAIModels } from "../../../services/chat.service";

const ChatPanel = () => {
  const { theme } = useTheme();

  const {
    user: { profilePicture, name },
  } = useSelector((state) => state.authentication);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getProviderLogo = (provider) => {
    switch (provider) {
      case "openai":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0462 6.0462 0 0 0 5.45-3.1818 5.9847 5.9847 0 0 0 3.998-2.9 6.0462 6.0462 0 0 0-.426-7.0971zM10.8423 22.0628a4.9408 4.9408 0 0 1-3.9535-1.9567l8.6031-4.9664a1.0503 1.0503 0 0 0 .532-.9064v-6.7032l2.0298 1.1717a4.9314 4.9314 0 0 1 1.9573 3.953 4.9314 4.9314 0 0 1-2.9 4.4925l-6.2687 3.6158zm-7.6186-5.836a4.9408 4.9408 0 0 1-1.04-4.2982l8.6031 4.9664v6.7032l-2.0298-1.1717a4.9314 4.9314 0 0 1-1.9573-3.953 4.9314 4.9314 0 0 1 .425-5.2635l-3.996-2.3065a4.9408 4.9408 0 0 1-.005 5.3233zm16.4862-2.1462l-8.6031-4.9664a1.0503 1.0503 0 0 0-1.064 0l-5.8118 3.354 2.0298-1.1717v-6.7032l3.996 2.3065a4.9314 4.9314 0 0 1 2.475 4.2785 4.9314 4.9314 0 0 1-2.475 4.2785l-1.9798 1.1425v-2.285zm-5.8118-8.919l5.8118 3.354-2.0298 1.1717v6.7032l-3.996-2.3065a4.9314 4.9314 0 0 1-2.475-4.2785 4.9314 4.9314 0 0 1 2.475-4.2785l1.9798-1.1425v2.285a1.0503 1.0503 0 0 0 1.064 0zm-8.6031-4.9664a4.9408 4.9408 0 0 1 3.9535 1.9567l-8.6031 4.9664a1.0503 1.0503 0 0 0-.532.9064v6.7032l-2.0298-1.1717a4.9314 4.9314 0 0 1-1.9573-3.953 4.9314 4.9314 0 0 1 2.9-4.4925l6.2687-3.6158zm7.6186 5.836a4.9408 4.9408 0 0 1 1.04 4.2982l-8.6031-4.9664v-6.7032l2.0298 1.1717a4.9314 4.9314 0 0 1 1.9573 3.953 4.9314 4.9314 0 0 1-.425 5.2635l3.996 2.3065a4.9408 4.9408 0 0 1 .005-5.3233z" />
          </svg>
        );
      case "anthropic":
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.562 10.655h-4.254l-3.155-5.467h-2.126l4.636 8.032H11.58L9.278 9.227 4.153 18.11H6.13l2.062-3.573H13.68l2.061 3.573h1.977l-4.634-8.031h4.15l3.155 5.466h2.127l-4.636-8.032zM8.865 13.38H11.6l-1.368-2.37-1.367 2.37z" />
          </svg>
        );
      case "gemini":
      default:
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.01 0l1.37 4.28a9.42 9.42 0 0 0 6.34 6.34L24 12.01l-4.28 1.37a9.42 9.42 0 0 0-6.34 6.34L12.01 24l-1.37-4.28a9.42 9.42 0 0 0-6.34-6.34L0 12.01l4.28-1.37a9.42 9.42 0 0 0 6.34-6.34L12.01 0z"/>
          </svg>
        );
    }
  };

  const chatEndRef = useRef(null);

  const CHAT_HISTORY_KEY = "chat_history";
  const shouldPreserveChat = localStorage.getItem("preserveChat") === "true";
  const storage = shouldPreserveChat ? localStorage : sessionStorage;

  const loadMessages = () => {
    const storedMessages = storage.getItem(CHAT_HISTORY_KEY);
    return storedMessages
      ? JSON.parse(storedMessages)
      : [{ text: "Hello! How can I help?", sender: "gemini" }];
  };

  const [messages, setMessages] = useState(loadMessages);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setLoading(true);
    setMessages((prev) => [
      ...prev,
      { text: "", sender: "gemini", loading: true },
    ]);

    try {
      const result = await chatWithAI(input, selectedModelId, setLoading);
      const fullText =
        result?.response || "⚠️ Failed to generate response, Try again later";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading ? { ...msg, text: "", loading: false } : msg,
        ),
      );

      let index = 0;
      const interval = setInterval(() => {
        setMessages((prev) =>
          prev.map((msg, i) =>
            i === prev.length - 1
              ? { ...msg, text: fullText.substring(0, index + 1) }
              : msg,
          ),
        );

        index++;
        if (index >= fullText.length) clearInterval(interval);
      }, 20);
    } catch (error) {
      const errorMsg =
        error?.message || "⚠️ Failed to generate response, Try again later";
      setMessages((prev) =>
        prev.map((msg) =>
          msg.loading ? { ...msg, text: errorMsg, loading: false } : msg,
        ),
      );
      console.error("ChatPanel error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    storage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  }, [messages, storage]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
      // Fetch available AI models
      const loadModels = async () => {
        try {
          const res = await fetchAIModels();
          if (res?.data) {
            setModels(res.data);
            const defaultModel = res.data.find(m => m.provider === 'gemini') || res.data[0];
            setSelectedModelId(localStorage.getItem("preferred_model_id") || defaultModel?.model_id || "");
          }
        } catch (error) {
          console.error("Failed to load models", error);
        }
      };
      loadModels();
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  const handleModelChange = (id) => {
    setSelectedModelId(id);
    localStorage.setItem("preferred_model_id", id);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="animate-float fixed bottom-7 right-7 z-30 w-[130px] text-sm bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white font-semibold p-4 rounded-full flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-transform"
      >
        <i className="fas fa-robot text-lg"></i>
        <p>ASK AI</p>
      </button>

      <div
        className={`fixed z-50 top-0 right-0 w-[75%] sm:w-[400px] h-[100dvh] sm:h-screen ${
          theme === "light"
            ? "bg-gradient-to-r from-[#0a2540] to-[#1d3557]"
            : "bg-gradient-to-br from-[#1E293B] to-[#334155]"
        } text-white p-5 shadow-2xl transform transition-transform duration-300 backdrop-blur-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center pb-3 border-b border-gray-500">
          <img src="/metro.png" className="w-[50px]" alt="" />
          <button
            className="text-gray-300 hover:text-white transition duration-200"
            onClick={() => setIsOpen(false)}
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        <div
          id="overflow"
          className="mt-4 h-[75%] overflow-y-auto space-y-3 p-2 custom-scrollbar"
        >
          {messages.map((msg, index) => (
            <div key={index} className="flex items-end gap-2">
              {msg.sender === "gemini" && (
                <div className="w-8 h-8 bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] rounded-full flex items-center justify-center shadow-md">
                  <i className="fas fa-robot text-white text-sm"></i>
                </div>
              )}
              <div
                className={`relative p-3 rounded-lg max-w-[75%] shadow-lg text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-500 self-end ml-auto text-white"
                    : "bg-gray-800 text-white"
                }`}
              >
                <span
                  className={`absolute w-3 h-3 ${
                    msg.sender === "user"
                      ? "bg-blue-500 -right-1 bottom-1 rotate-45"
                      : "bg-gray-800 -left-1 bottom-1 rotate-45"
                  }`}
                ></span>

                {msg.loading ? (
                  <ChatbotLoader />
                ) : (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                )}
              </div>
              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                  <img
                    className="rounded-full"
                    src={profilePicture}
                    alt={name}
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="w-[94%] bottom-4 right-2 absolute flex flex-col gap-2 z-10">
          {models.length > 0 && (
            <div className="relative mx-auto max-w-fit">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-gray-900 text-[0.8rem] px-5 py-[8px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] text-gray-300 shadow-lg hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                {getProviderLogo(models.find(m => m.model_id === selectedModelId)?.provider)}
                <span>{models.find(m => m.model_id === selectedModelId)?.model_name || "Select Model"}</span>
                <i className={`fas fa-chevron-down text-[0.6rem] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute bottom-full mb-2 w-max min-w-full bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-2xl flex flex-col z-20">
                  {models.map(m => (
                    <button
                      key={m.model_id}
                      onClick={() => handleModelChange(m.model_id)}
                      className={`flex items-center gap-2 px-4 py-3 text-left text-[0.8rem] transition hover:bg-gray-800 ${selectedModelId === m.model_id ? 'bg-gray-800 text-white' : 'text-gray-300'}`}
                    >
                      {getProviderLogo(m.provider)}
                      <span>{m.model_name}</span>
                      {selectedModelId === m.model_id && (
                        <i className="fas fa-check text-green-400 text-xs ml-auto pl-2"></i>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="relative">
            <i className="fas fa-robot text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-300"></i>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-gray-900 text-[0.92rem] sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12 text-white disabled:bg-gray-800 disabled:cursor-not-allowed"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-300 cursor-pointer">
              <button
                className="text-pink-400 hover:text-white transition-all duration-200 ml-2"
                onClick={sendMessage}
              >
                <i className="fas fa-paper-plane text-lg"></i>
              </button>
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900 opacity-15 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default ChatPanel;
