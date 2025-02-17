import React, { useState } from "react";
import { useTheme } from "../../../context";

const SettingModal = ({ onClose }) => {
  const sections = [
    { id: "security", label: "Security", icon: "fas fa-lock" },
    { id: "appearance", label: "Appearance", icon: "fas fa-palette" },
  ];

  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("security");

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-2 sm:p-5 rounded-lg w-[95%] sm:w-[800px]">
        <div className="flex flex-col md:flex-row gap-2 ">
          {/* Sidebar */}
          <div className="w-full md:w-64 sm:bg-gray-100 p-4 sm:shadow-lg rounded-lg md:block flex justify-center md:justify-start">
            <ul className="flex md:flex-col gap-2 w-full justify-center md:justify-start">
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={`p-3 text-sm cursor-pointer rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-all duration-300 ease-in-out ${
                    activeSection === section.id ? "bg-gray-300" : ""
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <i className={`${section.icon} mr-2`}></i>
                  {section.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6  rounded-lg flex items-center justify-center">
            <div className="text-sm text-gray-700 font-medium w-full sm:w-[400px]">
              {activeSection === "appearance" && (
                <div>
                  <button className="flex gap-5 justify-between items-center border-b py-[4px] border-gray-700 w-full">
                    <i
                      className={`fas ${
                        theme === "light" ? "fa-moon" : "fa-sun"
                      } text-sm text-gray-500 pr-2`}
                    ></i>
                    <p className="text-xs">
                      {theme === "light" ? " DARK" : " LIGHT"} MODE
                    </p>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={toggleTheme}
                      />
                      <span className="slider round"></span>
                    </label>
                  </button>
                </div>
              )}

              {activeSection === "security" && (
                <div className="flex flex-col items-center justify-center w-full">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Security Settings
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                    Update your password for enhanced security.
                  </p>
                  <form className="w-full max-w-sm space-y-6">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Old Password
                      </label>
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        placeholder="Enter old password"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
