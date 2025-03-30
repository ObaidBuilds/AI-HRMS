import React, { useState, useEffect } from "react";
import {
  FaPaperPlane,
  FaSearch,
  FaEllipsisV,
  FaArrowLeft,
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmile, BsPaperclip } from "react-icons/bs";

const employees = [
  {
    id: 1,
    name: "John Doe",
    designation: "Manager",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "online",
    lastSeen: "2 min ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Supervisor",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    status: "online",
    lastSeen: "5 min ago",
  },
  {
    id: 3,
    name: "David Lee",
    designation: "Developer",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    status: "offline",
    lastSeen: "1 hour ago",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    designation: "Designer",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    status: "online",
    lastSeen: "Just now",
  },
  {
    id: 5,
    name: "Michael Brown",
    designation: "QA Engineer",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    status: "offline",
    lastSeen: "3 hours ago",
  },
];

const ContactItem = ({ employee, isSelected, onSelect }) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
      isSelected
        ? "bg-blue-200 dark:bg-blue-700"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
    }`}
    onClick={() => onSelect(employee)}
  >
    <div className="relative flex-shrink-0">
      <img
        src={employee.profilePic}
        alt={employee.name}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
      />
      <span
        className={`absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-white dark:border-gray-800 ${
          employee.status === "online" ? "bg-green-500" : "bg-gray-400"
        }`}
      ></span>
    </div>
    <div className="flex-1 min-w-0 overflow-hidden">
      <p className="font-semibold text-sm sm:text-[0.92rem] truncate text-gray-900 dark:text-gray-100">
        {employee.name}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-400 truncate">
          {employee.designation}
        </p>
        <p className="text-[0.7rem] sm:text-xs text-gray-400 dark:text-gray-500 sm:block hidden">
          {employee.lastSeen}
        </p>
      </div>
    </div>
  </div>
);

const Message = ({ isSender, text, time }) => (
  <div
    className={`flex ${isSender ? "justify-end" : "justify-start"} mb-3 px-2`}
  >
    <div
      className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
        isSender
          ? "bg-blue-500 text-white rounded-tr-none dark:bg-blue-600"
          : "bg-gray-200 rounded-tl-none dark:bg-gray-700 dark:text-gray-100"
      }`}
    >
      <p className="text-sm sm:text-[0.92rem] font-medium">{text}</p>
      <p
        className={`text-[0.7rem] sm:text-xs mt-1 text-right ${
          isSender
            ? "text-blue-100 dark:text-blue-200"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        {time}
      </p>
    </div>
  </div>
);

const ChatPanel = ({ selectedEmployee, message, setMessage, onBack }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = React.useRef(null);

  useEffect(() => {
    if (selectedEmployee) {
      const demoMessages = [
        { id: 1, text: "Hi there!", time: "10:30 AM", isSender: false },
        {
          id: 2,
          text: "Hello! How are you?",
          time: "10:32 AM",
          isSender: true,
        },
        {
          id: 3,
          text: "I'm doing well, thanks for asking. How about you?",
          time: "10:33 AM",
          isSender: false,
        },
        {
          id: 4,
          text: "Pretty good! Just working on some projects.",
          time: "10:35 AM",
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
            <div className="flex items-center gap-1 sm:gap-2">
              <button className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <BsEmojiSmile className="text-sm sm:text-base" />
              </button>
              <button className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <BsPaperclip className="text-sm sm:text-base" />
              </button>
              <input
                className="flex-1 p-1.5 sm:p-2 text-sm sm:text-[0.92rem] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                className="p-1.5 sm:p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={handleSendMessage}
              >
                <IoMdSend className="text-sm sm:text-base" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center flex-1 text-gray-500 dark:text-gray-400 p-4 text-center">
          <div className="max-w-xs">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 sm:mb-4 flex items-center justify-center">
              <FaPaperPlane className="text-xl sm:text-2xl text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-sm font-medium sm:text-[0.92rem] text-gray-500 dark:text-gray-400">
              Choose a contact from the list to start chatting
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const Mail = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showContacts, setShowContacts] = useState(true);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBack = () => {
    setShowContacts(true);
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowContacts(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-sm sm:text-[0.92rem]">
      <div
        className={`${
          showContacts ? "flex" : "hidden"
        } lg:flex flex-col w-full lg:w-1/3 border-r dark:border-gray-700 bg-white dark:bg-gray-800`}
      >
        <div className="p-3 border-b dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100">
            Messages
          </h2>
          <div className="relative mb-3 sm:mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm sm:text-base" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 text-sm sm:text-[0.92rem] border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <ContactItem
                key={employee.id}
                employee={employee}
                isSelected={selectedEmployee?.id === employee.id}
                onSelect={handleSelectEmployee}
              />
            ))
          ) : (
            <div className="p-4 text-center text-sm sm:text-[0.92rem] text-gray-500 dark:text-gray-400">
              No contacts found
            </div>
          )}
        </div>
      </div>

      <ChatPanel
        message={message}
        onBack={handleBack}
        setMessage={setMessage}
        selectedEmployee={selectedEmployee}
      />
    </div>
  );
};

export default Mail;
