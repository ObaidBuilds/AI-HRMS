import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ChatPanel from "../../components/shared/chat/ChatPanel";
import ContactItem from "../../components/shared/chat/ContactItem";

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

const Communication = () => {

  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showContacts, setShowContacts] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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
    <div className="flex h-[92vh] rounded-lg sm:h-[99vh] bg-gray-100 dark:bg-gray-900 text-sm sm:text-[0.92rem] overflow-y-hidden">
      <div
        className={`${
          showContacts ? "flex" : "hidden"
        } lg:flex flex-col w-1/3 bg-white dark:bg-gray-800`}
      >
        <div className="p-3">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 dark:text-gray-100 p-3">
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

export default Communication;
