import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createFeedback } from "../../services/feedback.service";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaComment, FaEdit } from "react-icons/fa"; // Icons for form fields

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
        console.error("Error creating feedback:", error);
      });
  };

  return (
    <div className="h-[90vh] sm:h-screen flex justify-center items-center">
      <div id="modal" className="w-[94%] sm:max-w-md rounded-lg bg-white p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-center mb-9">
          <FaStar className="text-blue-600 text-3xl" />
          <h2 className="ml-2 text-xl font-semibold text-gray-700">
            Give Feedback
          </h2>
        </div>

        {/* Form */}
        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
          {/* Rating Select */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              Rating
            </label>
            <div className="relative flex items-center">
              <FaStar className="absolute left-3 text-gray-400 text-sm" />
              <select
                {...register("rating", { required: "Rating is required" })}
                className="pl-10 pr-4 py-2 w-full text-center rounded-lg border focus:border-blue-500 focus:outline-none text-sm bg-white"
                required
              >
                <option value="">--- Select Rating ---</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>
            {errors.rating && (
              <p className="mt-2 text-sm text-red-600">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Suggestion Input */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              Suggestion
            </label>
            <div className="relative flex items-center">
              <FaComment className="absolute left-3 text-gray-400 text-sm" />
              <input
                {...register("suggestion", {
                  required: "Suggestion is required",
                })}
                type="text"
                placeholder="Any suggestions?"
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:border-blue-500 focus:outline-none text-sm"
                required
              />
            </div>
            {errors.suggestion && (
              <p className="mt-2 text-sm text-red-600">
                {errors.suggestion.message}
              </p>
            )}
          </div>

          {/* Feedback Description */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              Feedback Description
            </label>
            <div className="relative flex items-center">
              <FaEdit className="absolute left-3  text-gray-400 text-sm top-3" />
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
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:border-blue-500 focus:outline-none text-sm"
                required
              ></textarea>
            </div>
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            {loading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Submit Feedback"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
