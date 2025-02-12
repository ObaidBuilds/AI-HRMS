import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/authentication.service";

const schema = z.object({
  authority: z.string().nonempty("Authority is required"),
  employeeId: z
    .string()
    .regex(/^\d{3}$/, "* Employee ID must be exactly 3 digits"),
  password: z.string().min(6, "* Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

const Login = () => {
  const dispatch = useDispatch();
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
    dispatch(login(credentials));
  };

  return (
    <section className="h-screen overflow-hidden">
      <main className="flex justify-center items-center w-full h-screen text-white">
        <div className="w-[88%] sm:w-[490px] sm:h-[94%] lg:h-[580px]  rounded-2xl shadow-md border border-gray-700 bg-gray-800">
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
            id="refill"
            className="flex flex-col items-center gap-2 pb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Department Select */}
            <div className="w-[85%] relative">
              <i className="far fa-building text-sm icon absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-200"></i>
              <select
                id="select"
                {...register("authority")}
                className="w-full bg-gray-700 text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-400 font-[500] pl-12"
                required
              >
                <option value="">--- Select Authority ---</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* Employee ID */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="far fa-user text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-200"></i>
                <input
                  type="text"
                  {...register("employeeId")}
                  placeholder="Employee ID"
                  autoComplete="off"
                  className="w-full bg-secondary text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-400 font-[500] pl-12"
                  required
                />
              </div>
              {errors.employeeId && (
                <p className="text-red-500 text-xs pl-3 mt-1">
                  {errors.employeeId.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="fas fa-unlock-alt text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-200"></i>
                <input
                  type={active ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className="w-full bg-secondary text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-400 font-[500] pl-12"
                  required
                />
                <span
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-200 cursor-pointer"
                  onClick={handleShowPass}
                >
                  {active ? (
                    <i className="fas fa-eye-slash text-sm"></i>
                  ) : (
                    <i className="fas fa-eye text-sm"></i>
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 pl-3">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-[85%] text-sm p-[18px] bg-green-500 text-white rounded-full font-medium hover:bg-gray-500 transition duration-300"
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin text-xs"></i>
              ) : (
                "Login"
              )}
            </button>

            <div className="text-sm flex items-center gap-2 mt-2 font-medium cursor-pointer">
              <input {...register("remember")} type="checkbox" />
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
