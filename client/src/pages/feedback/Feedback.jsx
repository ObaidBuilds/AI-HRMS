import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createFeedback } from "../../services/feedback";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";

const Feedback = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const { loading } = useSelector((state) => state.feedback);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    const feedbackData = { ...data, rating };

    dispatch(createFeedback(feedbackData))
      .unwrap()
      .then(() => {
        reset();
        setRating(0);
      })
      .catch((error) => {
        console.error("Error create compaint:", error);
      });
  };

  return (
    <section className="h-[90vh] flex justify-center items-center text-white">
      <div className="w-full sm:w-[95%] rounded-2xl p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Submit Your Feedback
          </h1>
        </div>

        <form
          className="space-y-3 sm:space-y-5 text-sm"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Rating Section */}
          <div className="text-center">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-4xl sm:text-5xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-500"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Description */}
          <div className="relative">
            <textarea
              {...register("description", {
                required: "Feedback description is required",
                maxLength: {
                  value: 300,
                  message: "Description cannot exceed 300 characters",
                },
              })}
              placeholder="Write your feedback..."
              rows="4"
              className={`w-full bg-gray-700 text-sm p-3 rounded-xl border ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:ring-blue-500"
              }`}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || rating === 0}
            className="w-full bg-blue-500 text-sm p-4 rounded-full font-medium hover:bg-blue-600 transition duration-300"
          >
            {loading ? (
              <ClipLoader size={10} color="white" loading={loading} />
            ) : (
              "Submit Feedback"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Feedback;
