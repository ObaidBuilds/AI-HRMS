import Message from "./Message";
import { IoMdSend } from "react-icons/io";
import { useRef, useEffect, useState } from "react";
import { BsEmojiSmile, BsPaperclip } from "react-icons/bs";
import { FaPaperPlane, FaEllipsisV, FaArrowLeft } from "react-icons/fa";

const ChatPanel = ({ selectedEmployee, message, setMessage, onBack }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedEmployee) {
      const demoMessages = [
        {
          id: 1,
          text: "Hello! How can I help !",
          time: "10:30 AM",
          isSender: false,
        },
        {
          id: 2,
          text: "Hello! How are you?",
          time: "10:32 AM",
          isSender: true,
        },
      ];
      setMessages(demoMessages);
    }
  }, [selectedEmployee]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSender: true,
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      setTimeout(() => {
        const reply = {
          id: messages.length + 2,
          text: "Thanks for your message! I'll get back to you soon.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isSender: false,
        };
        setMessages((prev) => [...prev, reply]);
      }, 1000);
    }
  };

  return (
    <div className="flex-1 flex flex-col border-l dark:border-gray-700 bg-white dark:bg-gray-900">
      {selectedEmployee ? (
        <>
          <div className="p-2 sm:p-3 border-b dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                className="lg:hidden p-1 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                onClick={onBack}
              >
                <FaArrowLeft className="text-sm sm:text-base" />
              </button>
              <img
                src={selectedEmployee.profilePic}
                alt={selectedEmployee.name}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  {selectedEmployee.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedEmployee.status === "online"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  {selectedEmployee.status === "online" ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <button className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <FaEllipsisV className="text-sm sm:text-base" />
            </button>
          </div>

          <div className="flex-1 p-2 sm:p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {messages.map((msg) => (
              <Message
                key={msg.id}
                isSender={msg.isSender}
                text={msg.text}
                time={msg.time}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 sm:p-3 border-t dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-1">
              <button className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <BsEmojiSmile className="text-base" />
              </button>
              <button className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <BsPaperclip className="text-base" />
              </button>
              <input
                className="flex-1 p-3 text-sm sm:text-[0.92rem] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleSendMessage}
              >
                <IoMdSend className="text-sm sm:text-base" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex items-center justify-center flex-1 text-gray-500 dark:text-gray-400 p-4 text-center">
          <div className="max-w-xs">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 sm:mb-4 flex items-center justify-center">
              <FaPaperPlane className="text-xl sm:text-2xl text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm font-medium sm:text-[0.92rem] sm:block hidden text-gray-500 dark:text-gray-400">
              Choose a contact from the list to start chatting
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPanel;
