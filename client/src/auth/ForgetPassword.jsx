import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/authentication.service";
import { forgetPasswordSchema } from "../validations";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authentication.loading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = (credentials) => {
    dispatch(login(credentials));
  };

  return (
    <section className="h-screen overflow-hidden">
      <main className="flex justify-center items-center w-full h-screen text-gray-900">
        <div className="w-[88%] sm:w-[490px] sm:h-[94%] lg:h-[300px] rounded-2xl shadow-2xl border border-gray-200 bg-white">
          <div className="flex flex-col items-center py-8">
            <h1
              className="text-xl sm:text-2xl mt-3 font-medium"
              style={{ fontFamily: "Bruno Ace, sans-serif" }}
            >
              Forget Password! <span className="handshake">🤦‍♂️</span>
            </h1>
          </div>
          <form
            id="refill"
            className="flex flex-col items-center gap-2 pb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Employee ID */}
            <div className="w-[85%]">
              <div className="w-full relative">
                <i className="far fa-user text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-800"></i>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter you email"
                  autoComplete="off"
                  className="w-full bg-[#E7E7E7] text-[0.9rem] sm:text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
                  // required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs pl-3 mt-1">
                  {errors.email.message}
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
                "Submit"
              )}
            </button>

            <div className="text-sm flex items-center gap-2 mt-2 font-medium cursor-pointer">
              <p>
                Not found ?{" "}
                <Link to={"/"}>
                  <span className="text-xs text-red-600 font-semibold">
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

export default ForgetPassword;
