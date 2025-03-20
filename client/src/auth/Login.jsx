import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/authentication.service";
import { authenticationSchema } from "../validations";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, loginError } = useSelector((state) => state.authentication);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authenticationSchema),
  });

  const handleShowPass = () => setShowPassword(!showPassword);

  const onSubmit = (credentials) => {
    dispatch(login(credentials));
  };

  return (
    <section className="h-screen overflow-hidden bg-gray-50">
      <main className="flex justify-center items-center w-full h-screen text-black font-medium">
        <div className="w-[88%] sm:w-[490px] rounded-2xl border border-gray-200 shadow-2xl bg-white">
          <div className="flex flex-col items-center py-5">
            <div className="sm:w-[125px] sm:h-[125px] w-[110px] h-[110px]  bg-[#808080] rounded-full flex items-center justify-center">
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
          {loginError && (
            <div id="modal" className="flex justify-center items-center mb-4">
              <div className="text-sm bg-red-100 text-red-800 w-[80%] p-3 rounded-lg flex gap-3 items-start border border-red-200 shadow-sm border-l-4 border-l-red-500 font-normal">
                <i class="fa-solid fa-triangle-exclamation text-red-600 text-lg"></i>
                <p className="text-[0.82rem]">{loginError}</p>
              </div>
            </div>
          )}
          <form
            id="refill"
            className="flex flex-col items-center gap-2 pb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Department Select */}
            <div className="w-[85%] relative">
              <i
                className={`fa fa-building text-[0.9rem] icon absolute left-5  transform -translate-y-1/2 text-gray-700
                 ${errors.authority ? "top-7" : "top-1/2"}
                `}
              ></i>
              <select
                id="select"
                {...register("authority")}
                className={`w-full bg-[#EFEFEF] text-center text-[0.9rem] p-[16px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12
                   ${errors.authority && "border border-red-500"}
                  `}
                disabled={loading}
              >
                <option value="">--- Select Authority ---</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
              {errors.authority && (
                <p className="text-red-500 text-[0.8rem] pl-3 mt-1 font-normal">
                  {errors.authority.message}
                </p>
              )}
            </div>

            {/* Employee ID */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="fa fa-user text-[0.9rem] absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
                <input
                  type="text"
                  {...register("employeeId")}
                  placeholder="Employee ID"
                  autoComplete="off"
                  className={`w-full bg-[#EFEFEF] text-[0.9rem] sm:text-center p-[16px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12
                     ${errors.employeeId && "border border-red-500"}
                    `}
                  disabled={loading}
                />
              </div>
              {errors.employeeId && (
                <p className="text-red-500 text-[0.8rem] pl-3 mt-1 font-normal">
                  {errors.employeeId.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="fas fa-unlock-alt text-[0.9rem] absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Password"
                  className={`w-full bg-[#EFEFEF] text-[0.9rem] sm:text-center p-[16px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12
                     ${errors.password && "border border-red-500"}
                    `}
                  disabled={loading}
                />
                <span
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-700 cursor-pointer"
                  onClick={handleShowPass}
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash text-[0.9rem]"></i>
                  ) : (
                    <i className="fas fa-eye text-[0.9rem]"></i>
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[0.8rem] mt-1 pl-3 font-normal">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-[85%] text-[0.9rem] p-[14px] bg-green-500 text-white rounded-full font-medium hover:bg-gray-500 transition duration-300"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center text-[0.8rem]">
                  <i className="fas fa-spinner fa-spin text-xs"></i>
                  Submitting
                </span>
              ) : (
                "Login"
              )}
            </button>

            <div className="text-sm flex items-center gap-2 mt-2 font-medium cursor-pointer">
              <input {...register("remember")} type="checkbox" />
              <p className="text-[0.8rem]">
                Remember me
                <span className="text-xs text-gray-700 font-mono pl-1">
                  ( 10 days )
                </span>
              </p>
            </div>

            <div className="text-[0.8rem] font-medium">
              Forget your password ?
              <Link to={"/forget/password"}>
                <span className="text-xs font-semibold text-green-500 hover:text-green-600 pl-1">
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
