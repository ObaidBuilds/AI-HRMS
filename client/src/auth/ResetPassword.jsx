import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import {
  checkResetPasswordValidity,
  resetPassword,
} from "../services/authentication.service";
import { resetPasswordSchema } from "../validations";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ResetPassword = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const forgetPasswordToken = searchQuery.get("verifyToken") || "";
  const employeeId = searchQuery.get("employee") || "";
  if (!employeeId || !forgetPasswordToken) return <Navigate to={"/"} />;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, resetPasswordError } = useSelector(
    (state) => state.authentication
  );
  const [validateLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data) => {
    dispatch(
      resetPassword({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
        employeeId,
        forgetPasswordToken,
      })
    )
      .unwrap()
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Error in reset:", error);
      });
  };

  useEffect(() => {
    async function validateResetLink() {
      const validate = await checkResetPasswordValidity(setLoading, {
        employeeId,
        forgetPasswordToken,
      });

      if (!validate) navigate("/reset/password/invalid");
    }

    validateResetLink();
  }, [employeeId, forgetPasswordToken, navigate]);

  if (validateLoading)
    return (
      <section className="w-full h-[90vh] flex justify-center items-center">
        <div className="flex items-center gap-2 justify-center text-[0.9rem] font-mono font-medium">
          <i className="fas fa-spinner fa-spin"></i>
          Checkign Validity
        </div>
      </section>
    );

  return (
    <section className="h-screen overflow-hidden bg-gray-50">
      <main className="flex justify-center items-center w-full h-screen text-gray-900">
        <div className="w-[88%] sm:w-[490px]  rounded-2xl shadow-2xl border border-gray-200 bg-white">
          <div className="flex flex-col items-center py-8">
            <h1
              className="text-xl sm:text-2xl mt-3 font-medium"
              style={{ fontFamily: "Bruno Ace, sans-serif" }}
            >
              Reset Password! <span className="handshake">🤦‍♂️</span>
            </h1>
          </div>
          {resetPasswordError && (
            <div id="modal" className="flex justify-center items-center mb-4">
              <div className="text-sm bg-red-100 text-red-800 w-[80%] p-3 rounded-lg flex gap-3 items-start border border-red-200 shadow-sm border-l-4 border-l-red-500 font-normal">
                <i class="fa-solid fa-triangle-exclamation text-red-600 text-lg"></i>
                <p className="text-[0.82rem]">{resetPasswordError}</p>
              </div>
            </div>
          )}
          <form
            id="refill"
            className="flex flex-col items-center gap-2 pb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* New Password */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="fas fa-unlock-alt text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
                <input
                  type="password"
                  {...register("newPassword")}
                  placeholder="New password"
                  className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[16px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12
                    ${errors.newPassword && "border border-red-500"}
                    `}
                  disabled={loading}
                />
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-[0.8rem] pl-3 mt-1 font-normal">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="fas fa-unlock-alt text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Confirm password"
                  className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[16px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12
                    ${errors.confirmPassword && "border border-red-500"}
                    `}
                  disabled={loading}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-[0.8rem] pl-3 mt-1 font-normal">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-[85%] text-sm p-[15px] bg-green-500 text-white rounded-full font-medium hover:bg-gray-500 transition duration-300"
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center text-[0.8rem]">
                  <i className="fas fa-spinner fa-spin text-xs"></i>
                  Submitting
                </span>
              ) : (
                "Submit"
              )}
            </button>

            <div className="text-sm flex items-center gap-2 mt-2 font-medium cursor-pointer">
              <p>
                Not found ?
                <Link to={"/"}>
                  <span className="text-xs text-red-600 font-semibold pl-1">
                    Go back
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
};

export default ResetPassword;
