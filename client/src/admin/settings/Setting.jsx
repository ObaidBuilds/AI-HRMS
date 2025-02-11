import React, { useState } from "react";
import { useTheme } from "../../context";

const sections = [
  { id: "security", label: "Security" },
  { id: "appearance", label: "Appearance" },
];

const Setting = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("security");

  return (
    <div className="flex flex-col md:flex-row gap-1 h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-50 dark:bg-secondary p-4 shadow-lg rounded-lg md:block flex justify-center md:justify-start">
        <ul className="flex md:flex-col gap-2 w-full justify-center md:justify-start">
          {sections.map((section) => (
            <li
              key={section.id}
              className={`p-3 text-sm cursor-pointer rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out ${
                activeSection === section.id
                  ? "bg-gray-300 dark:bg-gray-600"
                  : ""
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-100 dark:bg-secondary shadow-lg rounded-lg flex items-center justify-center">
        <div className="text-sm text-gray-700 dark:text-gray-300 font-medium w-full max-w-md">
          {activeSection === "appearance" && (
            <div>
              <button className="flex gap-5 justify-between items-center border-b py-[4px] border-gray-700 dark:border-gray-500 w-full">
                <i
                  className={`fas ${
                    theme === "light" ? "fa-moon" : "fa-sun"
                  } text-sm text-gray-500 dark:text-gray-300 pr-2`}
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
              <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                Update your password for enhanced security.
              </p>
              <form className="w-full max-w-sm">
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Old Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter old password"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
