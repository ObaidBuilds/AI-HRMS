import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { loginAdmin } from "../../services/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    employeeId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginAdmin(dispatch,navigate, formData);

    setFormData({
      employeeId: "",
      password: "",
    });
  };

  return (
    <section className="bg-gray-900 h-screen overflow-hidden">
      <div className="text-center p-4 text-sm border-b border-gray-600">
        Metro Cash & Carry
      </div>
      <div className=" flex items-center justify-center h-[95%]">
        <div className="bg-gray-800 border border-gray-700 shadow-lg rounded-lg p-8 w-[95%] h-[510px] sm:max-w-[400px] relative">
          {/* Profile Image */}
          <div className="flex justify-center mb-4">
            <i className="fas fa-user-circle text-[110px] border-8 border-indigo-500 rounded-full"></i>
          </div>
          {/* Login Form */}
          <h2 className="text-2xl font-bold text-center text-gray-200 mb-4">
            Welcome Back! 👋
          </h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="employeeId"
                className="block text-gray-400 text-sm font-semibold mb-2"
              >
                Emp Id
              </label>
              <div className="flex items-center border border-gray-600 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
                <FaEnvelope size={15} className="text-gray-400 mr-2" />{" "}
                {/* Email Icon */}
                <input
                  type="text"
                  id="employeeId"
                  placeholder="Enter your Employee Id"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className="w-full text-xs text-gray-300 bg-gray-800 focus:outline-none"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            {/* Password Field */}
            <div className="my-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-400 text-sm font-semibold mb-2"
              >
                Password
              </label>
              <div className="flex items-center border border-gray-600 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent">
                <FaLock size={15} className="text-gray-400 mr-2" />{" "}
                {/* Password Icon */}
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full text-xs text-gray-300 bg-gray-800 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  className="ml-2 text-gray-400 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-gray-400 text-sm text-center mt-5">
            Powered by Obaid
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
