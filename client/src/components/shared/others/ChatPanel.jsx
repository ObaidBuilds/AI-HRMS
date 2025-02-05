import React, { useState } from "react";
import { useTheme } from "../../../context";

const ChatPanel = () => {
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'm here to assist you! 😊", sender: "ai" },
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="animate-float fixed bottom-7 right-7 z-50 w-[60px] sm:w-[130px] text-sm bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] text-white font-semibold p-4 rounded-full flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-transform"
      >
        <i className="fas fa-robot text-lg"></i>
        <p className="sm:flex hidden">ASK AI</p>
      </button>

      <div
        className={`fixed z-50 top-0 right-0 w-full sm:w-[400px] h-screen ${
          theme === "light"
            ? "bg-gradient-to-r from-[#0a2540] to-[#1d3557]"
            : "bg-gradient-to-br from-[#1E293B] to-[#334155]"
        }  text-white p-5 shadow-2xl transform transition-transform duration-300 backdrop-blur-xl ${
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
              {msg.sender === "ai" && (
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
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <i className="fas fa-user text-white text-sm"></i>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-4 h-4 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-blue-400"></div>
              <span className="text-gray-300">AI is typing...</span>
            </div>
          )}
        </div>

        <div className="w-[94%] bottom-4 right-2 absolute">
          <div className="relative">
            <i className="fas fa-robot text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-300"></i>
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full bg-gray-900 text-[0.92rem] sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-500 font-[500] pl-12 text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
