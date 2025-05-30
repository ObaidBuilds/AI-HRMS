import React, { useState } from "react";
import { useTheme } from "../../../context";
import { useForm } from "react-hook-form";
import { sections, employeeSections } from "../../../data";
import { updatePassword } from "../../../services/authentication.service";
import { HiOutlineKey } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { updatePasswordSchema } from "../../../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoader from "../loaders/ButtonLoader";
import { FiEdit2, FiUser, FiMail, FiUpload } from "react-icons/fi";

const SettingModal = ({ onClose, location = "admin" }) => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const { loading, updatePasswordError, user } = useSelector(
    (state) => state.authentication
  );
  const [formData, setFormData] = useState({
    username: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
  });
  const [preview, setPreview] = useState(formData.profilePicture);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function onSubmit(credentials) {
    dispatch(updatePassword(credentials))
      .unwrap()
      .then(() => reset())
      .catch((error) => {
        console.error("Error in update password:", error);
      });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
                    <HiOutlineKey className="text-blue-600 text-4xl" />
                    <h2 className="ml-2 text-xl font-semibold text-gray-700">
                      Update Password
                    </h2>
                  </div>
                  <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
                    {updatePasswordError && (
                      <div
                        id="modal"
                        className="flex justify-center items-center mb-4"
                      >
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
                        <HiOutlineLockClosed className="absolute left-3 text-gray-400 text-lg" />
                        <input
                          type="password"
                          className={`pl-10 pr-4 py-3 w-full rounded-lg border
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
                        <HiOutlineLockClosed className="absolute left-3 text-gray-400 text-lg" />
                        <input
                          type="password"
                          className={`pl-10 pr-4 py-3 w-full rounded-lg border
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
                        <HiOutlineLockClosed className="absolute left-3 text-gray-400 text-lg" />
                        <input
                          type="password"
                          className={`pl-10 pr-4 py-3 w-full rounded-lg border
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
                      disabled={loading}
                      type="submit"
                      className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <ButtonLoader />
                          Updating
                        </span>
                      ) : (
                        "Update Password"
                      )}
                    </button>
                  </form>
                </div>
              )}

              {activeSection === "profile" && (
                <div>
                  <div className="p-6 border-b dark:border-gray-700">
                    <div className="mt-6 flex flex-col sm:flex-row items-start gap-6">
                      <div
                        className="relative group"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      >
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-600 relative">
                          <img
                            src={
                              preview || "https://avatar.vercel.sh/placeholder"
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                          {isHovering && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
                              <FiUpload className="text-white text-xl" />
                            </div>
                          )}
                        </div>
                        <label
                          htmlFor="file-input"
                          className={`absolute -bottom-2 -right-2 rounded-full p-2 cursor-pointer transition-all ${
                            "light" === "dark"
                              ? "bg-gray-700 hover:bg-gray-600"
                              : "bg-white hover:bg-gray-100"
                          } shadow-md`}
                        >
                          <FiEdit2 className="text-blue-500" size={16} />
                        </label>
                        <input
                          id="file-input"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {user.email}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                          JPG, GIF or PNG. Max size of 2MB
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Username
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2.5 rounded-md border ${
                            "light" === "dark"
                              ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                              : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          } placeholder-gray-400 sm:text-sm`}
                          placeholder="Your username"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Email address
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2.5 rounded-md border ${
                            "light" === "dark"
                              ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                              : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                          } placeholder-gray-400 sm:text-sm`}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>
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
