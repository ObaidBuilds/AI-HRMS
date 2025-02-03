import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createFeedback } from "../../services/feedback.service";
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
    dispatch(createFeedback(data))
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
    <section className="h-[80vh] flex justify-center items-center text-white">
      <div className="w-full sm:w-[95%] rounded-2xl p-5 sm:p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Submit Your Feedback
          </h1>
        </div>

        <form className="space-y-2 text-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <i className="fa fa-calendar-check text-sm absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <select
              {...register("rating", { required: "Rating  is required" })}
              className="w-full bg-[#EFEFEF] text-gray-800 text-center text-sm p-4 rounded-full border border-gray-200 pl-12 focus:ring-2 focus:ring-blue-500"
              id="select"
            >
              <option value="">--- Select Rating ---</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>
          <div className="relative">
            <i className="fa fa-calendar-check text-sm absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              {...register("suggestion", {
                required: "Leave type is required",
              })}
              type="text"
              placeholder="Any Suggestion"
              className="w-full bg-[#EFEFEF] text-gray-800 text-center text-sm p-4 rounded-full border border-gray-200 pl-12 focus:ring-2 focus:ring-blue-500"
            />
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
              className={`w-full bg-[#EFEFEF] text-gray-800 text-sm p-3 rounded-xl border ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:ring-blue-500"
              }`}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-sm p-4 rounded-full font-medium hover:bg-blue-600 transition duration-300"
          >
            {loading ? (
               <i className="fas fa-spinner fa-spin"></i>
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
