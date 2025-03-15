import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createComplaint } from "../../services/complaint.service";
import { FaListAlt, FaEnvelope, FaEdit } from "react-icons/fa"; 

const Complaint = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.complaint);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createComplaint(data))
      .unwrap()
      .then(() => reset())
      .catch((error) => {
        console.error("Error creating complaint:", error);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div id="modal" className="w-[94%] sm:max-w-md rounded-lg bg-white p-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-9">
          <i className="fas fa-circle-exclamation text-blue-600 text-3xl"></i>
          <h2 className="ml-2 text-xl font-semibold text-gray-700">
            Report an Issue
          </h2>
        </div>

        {/* Form */}
        <form className="text-sm" onSubmit={handleSubmit(onSubmit)}>
          {/* Complaint Type */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              Complaint Type
            </label>
            <div className="relative flex items-center">
              <FaListAlt className="absolute left-3 text-gray-400 text-sm" />
              <select
                {...register("complainType", {
                  required: "Complaint type is required",
                })}
                className="pl-10 pr-4 py-2 w-full text-center rounded-lg border bg-white focus:border-blue-500 focus:outline-none"
                required
              >
                <option value="">--- Select Complaint Type ---</option>
                <option value="Workplace">Workplace Issue</option>
                <option value="Payroll">Payroll Issue</option>
                <option value="Harassment">Harassment</option>
                <option value="Leave">Leave Dispute</option>
                <option value="Scheduling">Scheduling Issue</option>
                <option value="Misconduct">Employee Misconduct</option>
              </select>
            </div>
            {errors.complainType && (
              <p className="mt-2 text-sm text-red-600">
                {errors.complainType.message}
              </p>
            )}
          </div>

          {/* Complaint Subject */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              Complaint Subject
            </label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-3 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Complaint Subject"
                autoComplete="off"
                {...register("complainSubject", {
                  required: "Complaint subject is required",
                })}
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            {errors.complainSubject && (
              <p className="mt-2 text-sm text-red-600">
                {errors.complainSubject.message}
              </p>
            )}
          </div>

          {/* Complaint Details */}
          <div className="mb-4">
            <label className="block font-medium text-gray-600 mb-2">
              Complaint Details
            </label>
            <div className="relative flex items-center">
              <FaEdit className="absolute left-3 text-gray-400 text-sm top-3" />
              <textarea
                placeholder="Complaint Details"
                rows="4"
                {...register("complaintDetails", {
                  required: "Complaint details are required",
                })}
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:border-blue-500 focus:outline-none"
                required
              ></textarea>
            </div>
            {errors.complaintDetails && (
              <p className="mt-2 text-sm text-red-600">
                {errors.complaintDetails.message}
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
              "Submit Complaint"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Complaint;
