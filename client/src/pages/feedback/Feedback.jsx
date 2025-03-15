import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { createFeedback } from "../../services/feedback.service";
import { feedbackSchema } from "../../validations";

const Feedback = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.feedback.loading);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
  });

  const onSubmit = (data) => {
    dispatch(createFeedback(data))
      .unwrap()
      .then(() => {
        reset();
        setRating(0);
      })
      .catch((error) => {
        console.error("Error creating feedback:", error);
      });
  };

  return (
    <section className="h-[90vh] sm:h-screen overflow-hidden bg-gray-50">
      <main className="flex justify-center items-center w-full h-screen text-black font-medium">
        <div className="w-[94%] sm:w-[490px] rounded-2xl border border-gray-200  bg-white">
          <div className="flex flex-col items-center py-8">
            <h1 className="text-[1.3rem] mt-3 font-extrabold flex items-center gap-2">
              <i className="fa-regular fa-comments"></i>
              Give Your Feedback
            </h1>
          </div>

          <form
            id="feedback-form"
            className="flex flex-col items-center gap-2 pb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Rating Select */}
            <div className="w-[85%] relative">
              <select
                id="select"
                {...register("rating")}
                className="w-full bg-[#EFEFEF] text-center text-sm p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]"
                required
              >
                <option value="">--- Select Rating ---</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
              {errors.rating && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Suggestion Input */}
            <div className="w-[85%]">
              <input
                type="text"
                {...register("suggestion")}
                placeholder="Any suggestions?"
                className="w-full bg-[#EFEFEF] text-sm text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]"
                required
              />
              {errors.suggestion && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.suggestion.message}
                </p>
              )}
            </div>

            {/* Feedback Description */}
            <div className="w-[85%]">
              <textarea
                {...register("description")}
                placeholder="Write your feedback..."
                rows="4"
                className="w-full bg-[#EFEFEF] text-sm p-[18px] rounded-lg focus:outline focus:outline-2 focus:outline-gray-700 font-[500]"
                required
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-[85%] rounded-full bg-blue-600 p-4 text-sm text-white transition hover:bg-blue-700"
            >
              {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Feedback;
