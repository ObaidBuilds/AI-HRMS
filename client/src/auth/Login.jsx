import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";
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
    <section className="h-screen overflow-hidden bg-gray-50">
      <main className="flex justify-center items-center w-full h-screen text-black">
        <div className="w-[88%] sm:w-[490px] sm:h-[94%] lg:h-[580px] rounded-2xl border border-gray-200 shadow-md bg-white">
          <div className="flex flex-col items-center py-8">
            <div className="sm:w-[140px] w-[120px] h-[120px] sm:h-[140px] bg-gray-400 rounded-full flex items-center justify-center">
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
              style={{ fontFamily: "Bruno Ace, sans-serif" }}
              className="text-2xl sm:text-3xl mt-3 font-semibold"
            >
              Welcome Back! <span className="handshake">👋</span>
            </h1>
          </div>

          <form
            id="refill"
            className="flex flex-col items-center gap-2 pb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-[85%] relative">
              <select
                id="select"
                {...register("authority")}
                className="w-full bg-gray-100 border text-center text-[0.92rem] p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]"
                required
              >
                <option value="">--- Select Authority ---</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div className="w-[85%]">
              <div className="w-full relative">
                <input
                  type="text"
                  {...register("employeeId")}
                  placeholder="Employee ID"
                  autoComplete="off"
                  className="w-full bg-gray-100 border text-[0.92rem] sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]"
                  required
                />
              </div>
              {errors.employeeId && (
                <p className="text-red-500 text-xs sm:mt-1 mt-2">
                  {errors.employeeId.message}
                </p>
              )}
            </div>

            <div className="w-[85%]">
              <div className="w-full relative">
                <input
                  type={active ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className="w-full bg-gray-100 border text-[0.92rem] sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]"
                  required
                />
                <span
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handleShowPass}
                >
                  {active ? (
                    <FaEyeSlash color="black" size={17} />
                  ) : (
                    <FaEye color="black" size={17} />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs sm:mt-1 mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-[85%] text-sm sm:text-[0.95rem] p-[18px] bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition duration-300"
            >
              {loading ? (
                <ClipLoader size={10} color="white" loading={loading} />
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
