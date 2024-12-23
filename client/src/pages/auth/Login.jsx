import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";
import { loginAdmin } from "../../services/auth";

const schema = z.object({
  department: z.string().nonempty("Department is required"),
  employeeId: z
    .string()
    .regex(/^\d{3}$/, "* Employee ID must be exactly 3 digits"),
  password: z.string().min(6, "* Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);
  const loading = useSelector((state) => state.authentication.loading);

  const [active, setActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleShowPass = () => setActive(!active);

  const onSubmit = (credentials) => {
    dispatch(loginAdmin(credentials));
  };

  return (
    <section className="h-screen overflow-hidden bg-primary">
      <main className="flex justify-center items-center w-full h-screen text-white">
        <div className="w-[88%] sm:w-[490px] rounded-2xl shadow-md border border-gray-700 bg-gray-800">
          <div className="flex flex-col items-center py-8">
            <div className="sm:w-[140px] w-[120px] h-[120px] sm:h-[140px] bg-gray-600 rounded-full flex items-center justify-center">
              <img
                src="/metro.png"
                alt="user"
                width={"70"}
                height={"70"}
                loading="lazy"
                className="w-[70px] sm:w-[80px]"
              />
            </div>
            <h1
              className="text-2xl sm:text-3xl mt-3 "
              style={{ fontFamily: "Bruno Ace, sans-serif" }}
            >
              Welcome Back! <span className="handshake">👋</span>
            </h1>
          </div>

          <form
            className="flex flex-col items-center gap-2 pb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Department Select */}
            <div className="w-[85%] relative">
              <i className="fa fa-building-columns text-sm icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300"></i>
              <select
                id="select"
                {...register("department")}
                className="w-full bg-secondary text-center text-[0.9rem] p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-400 font-[500] pl-12"
                required
              >
                <option value="">--- Select Depart ---</option>
                {departments &&
                  departments.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Employee ID */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="fa fa-user text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-300"></i>
                <input
                  type="text"
                  {...register("employeeId")}
                  placeholder="Employee ID"
                  autoComplete="off"
                  className="w-full bg-secondary text-[0.9rem] sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-400 font-[500] pl-12"
                  required
                />
              </div>
              {errors.employeeId && (
                <p className="text-red-500 text-xs sm:mt-1 mt-2">
                  {errors.employeeId.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="fa fa-key text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-300"></i>
                <input
                  type={active ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className="w-full bg-secondary text-[0.9rem] sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-400 font-[500] pl-12"
                  required
                />
                <span
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-800 cursor-pointer"
                  onClick={handleShowPass}
                >
                  {active ? (
                    <FaEyeSlash color="white" size={17} />
                  ) : (
                    <FaEye color="white" size={17} />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs sm:mt-1 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-[85%] text-sm sm:text-[0.95rem] p-[18px] bg-green-500 text-white rounded-full font-medium hover:bg-gray-500 transition duration-300"
            >
              {loading ? (
                <ClipLoader size={10} color="white" loading={loading} />
              ) : (
                "Login"
              )}
            </button>

            <div className="text-sm flex items-center gap-2 mt-2 font-medium">
              <input type="checkbox" />
              <p>
                Remember me <span className="text-xs">( 30 days )</span>
              </p>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Login;
