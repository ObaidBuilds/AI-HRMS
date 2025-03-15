import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createLeave } from "../../services/leave.service";
import { GiEarthAmerica } from "react-icons/gi"; // Example icon for the header
import { FaCalendarCheck, FaClock, FaCalendar } from "react-icons/fa"; // Icons for form fields

const Leave = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.leave);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createLeave(data))
      .unwrap()
      .then(() => reset())
      .catch((error) => {
        console.error("Error creating leave:", error);
      });
  };

  return (
    <div className="h-[90vh] sm:h-screen flex justify-center items-center border border-gray-200">
      <div id="modal" className="w-[88%] sm:max-w-md rounded-lg bg-white p-8 shadow-2xl sm:shadow-none">
        {/* Header */}
        <div className="flex items-center justify-center mb-9">
          <GiEarthAmerica className="text-blue-600 text-3xl" />
          <h2 className="ml-2 text-xl font-semibold text-gray-700">
            Apply for Leave
          </h2>
        </div>

        {/* Form */}
        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
          {/* Leave Type Select */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              Leave Type
            </label>
            <div className="relative flex items-center">
              <FaCalendarCheck className="absolute left-3 text-gray-400 text-sm" />
              <select
                {...register("leaveType", {
                  required: "Leave type is required",
                })}
                className="pl-10 pr-4 py-2 text-center w-full bg-white rounded-lg border focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">--- Select Leave Type ---</option>
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
                <option value="Vacation">Vacation Leave</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            {errors.leaveType && (
              <p className="mt-2 text-sm text-red-600">
                {errors.leaveType.message}
              </p>
            )}
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              Duration (in days)
            </label>
            <div className="relative flex items-center">
              <FaClock className="absolute left-3 text-gray-400 text-sm" />
              <input
                type="number"
                placeholder="Enter duration"
                {...register("duration", {
                  required: "Duration is required",
                  min: { value: 1, message: "Duration must be at least 1 day" },
                })}
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            {errors.duration && (
              <p className="mt-2 text-sm text-red-600">
                {errors.duration.message}
              </p>
            )}
          </div>

          {/* From Date */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              From Date
            </label>
            <div className="relative flex items-center">
              <FaCalendar className="absolute left-3 text-gray-400 text-sm" />
              <input
                type="date"
                {...register("fromDate", { required: "From date is required" })}
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            {errors.fromDate && (
              <p className="mt-2 text-sm text-red-600">
                {errors.fromDate.message}
              </p>
            )}
          </div>

          {/* To Date */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              To Date
            </label>
            <div className="relative flex items-center">
              <FaCalendar className="absolute left-3 text-gray-400 text-sm" />
              <input
                type="date"
                {...register("toDate", { required: "To date is required" })}
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            {errors.toDate && (
              <p className="mt-2 text-sm text-red-600">
                {errors.toDate.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              "Submit Leave Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Leave;
