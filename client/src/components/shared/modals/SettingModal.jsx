import React, { useState } from "react";
import { useTheme } from "../../../context";

const SettingModal = ({ onClose }) => {
  const sections = [
    { id: "general", label: "Account Settings", icon: "fas fa-cogs fa-lg" },
    { id: "security", label: "Security Settings", icon: "fas fa-lock fa-lg" },
    { id: "profile", label: "Manage Profile", icon: "fas fa-user-alt fa-lg" },
  ];

  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("security");

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        id="modal"
        className="w-full sm:w-[600px] md:w-[800px] h-auto sm:h-[500px] rounded-lg bg-white flex flex-col md:flex-row gap-1 shadow-xl"
      >
        {/* Sidebar */}
        <div className="w-full md:w-56 p-4 flex flex-col justify-start bg-headLight rounded-lg">
          <ul className="flex md:flex-col gap-3 w-full justify-start text-sm"></ul>
        </div>

        {/* Content Area */}
        <div className="w-full sm:w-[500px] flex-1 p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col justify-start">
          <div className="text-sm text-gray-700 font-medium mb-4">
            <div className="mt-4">
              {activeSection === "general" && <div></div>}
              {activeSection === "profile" && <div></div>}
              {activeSection === "security" && <div></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
