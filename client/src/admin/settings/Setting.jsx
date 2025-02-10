import React, { useState } from "react";
import { useTheme } from "../../context";

const sections = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "appearance", label: "Appearance" },
];

const Setting = () => {
  const { theme, toggleTheme } = useTheme();

  const [activeSection, setActiveSection] = useState("appearance");

  return (
    <div className="flex gap-1 h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-secondary p-4 shadow-lg rounded-lg">
        <ul>
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
      <div className="flex-1 p-6 bg-gray-100 dark:bg-secondary shadow-lg rounded-lg">
        <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
          {activeSection === "appearance" && (
            <div>
              <button className="flex gap-5 justify-between items-center border-b py-[4px] border-gray-700 dark:border-gray-500">
                <i
                  className={`fas ${
                    theme === "light" ? "fa-moon" : "fa-sun"
                  }  text-sm text-gray-500 dark:text-gray-400 pr-2`}
                ></i>
                <p className=" text-sm">
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

          {activeSection === "security" && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default Setting;
