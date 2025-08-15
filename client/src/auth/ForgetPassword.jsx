import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { forgetPasswordSchema } from "../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../services/authentication.service";
import ButtonLoader from "../components/shared/loaders/ButtonLoader";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, forgetPasswordError } = useSelector(
    (state) => state.authentication
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = (credentials) => {
    dispatch(forgetPassword(credentials))
      .unwrap()
      .then(() => navigate("/email/confirmation"))
      .catch((error) => {
        console.error("Error in forget:", error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Forget Password - Metro HR</title>
      </Helmet>

      <section className="h-screen overflow-hidden bg-gray-50">
        <main className="flex justify-center items-center w-full h-screen text-gray-900">
          <div className="w-[88%] sm:w-[490px] rounded-2xl shadow-2xl border border-gray-200 bg-white">
            <div className="flex flex-col items-center py-8">
              <h1
                className="text-xl sm:text-2xl mt-3 font-medium"
                style={{ fontFamily: "Bruno Ace, sans-serif" }}
              >
                Forget Password! <span className="handshake">🤦‍♂️</span>
              </h1>
            </div>
            {forgetPasswordError && (
              <div id="modal" className="flex justify-center items-center mb-4">
                <div className="text-sm bg-red-100 text-red-800 w-[80%] p-3 rounded-lg flex gap-3 items-start border border-red-200 shadow-sm border-l-4 border-l-red-500 font-normal">
                  <i class="fa-solid fa-triangle-exclamation text-red-600 text-lg"></i>
                  <p className="text-[0.82rem]">{forgetPasswordError}</p>
                </div>
              </div>
            )}
            <form
              id="refill"
              className="flex flex-col items-center gap-2 pb-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Employee ID */}
              <div className="w-[85%]">
                <div className="w-full relative">
                  <i className="fa fa-user text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-800"></i>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter you email"
                    className={`w-full bg-[#EFEFEF] text-sm sm:text-center p-[16px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12
                      ${errors.email && "border border-red-500"}
                    `}
                    // required
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[0.8rem] pl-3 mt-1 font-normal">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-[85%] text-sm p-[15px] bg-green-500 text-white rounded-full font-medium hover:bg-gray-500 transition duration-300 disabled:bg-green-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center text-[0.8rem]">
                    <ButtonLoader />
                    Submitting
                  </span>
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
    </>
  );
};

export default ForgetPassword;
