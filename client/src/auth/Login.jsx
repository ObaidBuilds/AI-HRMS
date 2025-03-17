import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/authentication.service";
import { authenticationSchema } from "../validations";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authentication.loading);

  const [active, setActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authenticationSchema),
  });

  const handleShowPass = () => setActive(!active);

  const onSubmit = (credentials) => {
    dispatch(login(credentials));
  };

  return (
    <section className="h-screen overflow-hidden bg-gray-50">
      <main className="flex justify-center items-center w-full h-screen text-black font-medium">
        <div className="w-[88%] sm:w-[490px] rounded-2xl border border-gray-200 shadow-2xl bg-white">
          <div className="flex flex-col items-center py-5">
            <div className="sm:w-[140px] w-[120px] h-[120px] sm:h-[140px] bg-[#808080] rounded-full flex items-center justify-center">
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
              className="text-2xl sm:text-3xl mt-3 font-medium"
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
              <i className="fa fa-building text-sm icon absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
              <select
                id="select"
                {...register("authority")}
                className={`w-full bg-[#EFEFEF] text-center text-sm p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12
                   ${errors.authority && "border border-red-500"}
                  `}
                disabled={loading}
              >
                <option value="">--- Select Authority ---</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
              {errors.authority && (
                <p className="text-red-500 text-[0.8rem] pl-3 mt-1">
                  {errors.authority.message}
                </p>
              )}
            </div>

            {/* Employee ID */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="fa fa-user text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
                <input
                  type="text"
                  {...register("employeeId")}
                  placeholder="Employee ID"
                  autoComplete="off"
                  className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12
                     ${errors.employeeId && "border border-red-500"}
                    `}
                  disabled={loading}
                />
              </div>
              {errors.employeeId && (
                <p className="text-red-500 text-[0.8rem] pl-3 mt-1">
                  {errors.employeeId.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="fas fa-unlock-alt text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
                <input
                  type={active ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12
                     ${errors.password && "border border-red-500"}
                    `}
                  disabled={loading}
                />
                <span
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
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
                <p className="text-red-500 text-[0.8rem] mt-1 pl-3">
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

            <div className="text-sm  items-center gap-2 mt-2 font-medium cursor-pointer hidden">
              <input {...register("remember")} type="checkbox" />
              <p>
                Remember me <span className="text-xs">( 10 days )</span>
              </p>
            </div>

            <div className="text-sm font-medium mt-3">
              Forget your password ?{" "}
              <Link to={"/forget/password"}>
                <span className="text-xs font-semibold text-green-500 hover:text-green-600">
                  Click here
                </span>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Login;
