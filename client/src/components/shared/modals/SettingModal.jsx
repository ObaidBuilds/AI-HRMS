import React, { useState } from "react";
import { useTheme } from "../../../context";
import { useForm } from "react-hook-form";
import { sections, employeeSections } from "../../../data";
import { updatePassword } from "../../../services/authentication.service";
import { GiEarthAmerica } from "react-icons/gi";
import { HiLockClosed } from "react-icons/hi";
import { updatePasswordSchema } from "../../../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";

const SettingModal = ({ onClose, location = "admin" }) => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("security");
  const { loading, updatePasswordError } = useSelector(
    (state) => state.authentication
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  function onSubmit(credentials) {
    dispatch(updatePassword(credentials))
      .unwrap()
      .then(() => reset())
      .catch((error) => {
        console.error("Error in reset password:", error);
      });
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        id="modal"
        className="bg-white relative p-2 sm:p-5 rounded-lg w-[90%] sm:w-[800px]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-0 right-3 sm:right-[-2.4rem] w-6 h-6 rounded-full text-gray-600 sm:text-white hidden sm:block"
        >
          <i className="fas fa-times text-sm"></i>
        </button>

        <div className="flex flex-col md:flex-row gap-2 ">
          {/* Sidebar */}
          <div className="w-full md:w-64 sm:bg-gray-50 p-4 rounded-lg md:block hidden sm:flex justify-center md:justify-start">
            <ul className="flex md:flex-col gap-2 w-full justify-center md:justify-start">
              {location === "employee"
                ? employeeSections.map((section) => (
                    <li
                      key={section.id}
                      className={`p-3 text-sm cursor-pointer rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-all duration-300 ease-in-out ${
                        activeSection === section.id ? "bg-gray-200" : ""
                      }`}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <i className={`${section.icon} mr-2`}></i>
                      {section.label}
                    </li>
                  ))
                : sections.map((section) => (
                    <li
                      key={section.id}
                      className={`p-3 text-sm cursor-pointer rounded-lg font-medium text-gray-700 hover:bg-gray-200 transition-all duration-300 ease-in-out ${
                        activeSection === section.id ? "bg-gray-200" : ""
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
          <div className="flex-1 rounded-lg flex items-center justify-center">
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
                <div className="w-[99%] sm:max-w-md rounded-lg bg-white p-8">
                  <div className="flex items-center justify-center mb-9">
                    <GiEarthAmerica className="text-blue-600 text-4xl" />
                    <h2 className="ml-2 text-xl font-semibold text-gray-700">
                      Update Password
                    </h2>
                  </div>
                  <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
                    {updatePasswordError && (
                      <div className="flex justify-center items-center mb-4">
                        <div className="text-sm bg-red-100 text-red-800 w-full p-3 rounded-lg flex gap-3 items-start border border-red-200 shadow-sm border-l-4 border-l-red-500 font-normal">
                          <i class="fa-solid fa-triangle-exclamation text-red-600 text-lg"></i>
                          <p className="text-[0.82rem]">
                            {updatePasswordError}
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Old Password Field */}
                    <div className="mb-4">
                      <label className="block font-medium text-gray-600 mb-2">
                        Old Password
                      </label>
                      <div className="relative flex items-center">
                        <HiLockClosed className="absolute left-3 text-gray-400 text-lg" />
                        <input
                          type="password"
                          className={`pl-10 pr-4 py-2 w-full rounded-lg border focus:border-blue-500 focus:outline-none
                              ${errors.oldPassword && "border border-red-500"}
                            `}
                          placeholder="Enter your old password"
                          {...register("oldPassword")}
                        />
                      </div>
                      {errors.oldPassword && (
                        <p className="text-red-500 text-[0.8rem] pl-2 mt-1 font-normal">
                          {errors.oldPassword.message}
                        </p>
                      )}
                    </div>

                    {/* New Password Field */}
                    <div className="mb-4">
                      <label className="block font-medium text-gray-600 mb-2">
                        New Password
                      </label>
                      <div className="relative flex items-center">
                        <HiLockClosed className="absolute left-3 text-gray-400 text-lg" />
                        <input
                          type="password"
                          className={`pl-10 pr-4 py-2 w-full rounded-lg border focus:border-blue-500 focus:outline-none
                              ${errors.newPassword && "border border-red-500"}
                            `}
                          placeholder="Enter your new password"
                          {...register("newPassword")}
                        />
                      </div>
                      {errors.newPassword && (
                        <p className="text-red-500 text-[0.8rem] pl-2 mt-1 font-normal">
                          {errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4">
                      <label className="block font-medium text-gray-600 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative flex items-center">
                        <HiLockClosed className="absolute left-3 text-gray-400 text-lg" />
                        <input
                          type="password"
                          className={`pl-10 pr-4 py-2 w-full rounded-lg border focus:border-blue-500 focus:outline-none
                              ${
                                errors.confirmPassword &&
                                "border border-red-500"
                              }
                            `}
                          placeholder="Confirm your new password"
                          {...register("confirmPassword")}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-[0.8rem] pl-2 mt-1 font-normal">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                      {loading ? (
                        <i className="fa fa-spinner fa-spin"></i>
                      ) : (
                        "Update Password"
                      )}
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
