import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createComplaint } from "../../services/complaint.service";
import ClipLoader from "react-spinners/ClipLoader";

const Complaint = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.complaint);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(createComplaint(data))
      .unwrap()
      .then(() => reset())
      .catch((error) => {
        console.error("Error create compaint:", error);
      });
  };

  return (
    <section className="h-[80vh] flex justify-center items-center text-white">
      <div className="w-full sm:w-[95%] rounded-2xl p-5 sm:p-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Submit Your Complaint
          </h1>
        </div>

        <form className="space-y-2 text-sm" onSubmit={handleSubmit(onSubmit)}>
          {/* Complaint Type */}
          <div className="relative">
            <i className="fa fa-list-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <select
              id="select"
              className="w-full bg-gray-100 text-gray-800 text-center text-sm p-4 rounded-full border border-gray-300 pl-12 focus:ring-2 focus:ring-blue-500"
              {...register("complainType", {
                required: "Complaint type is required",
              })}
            >
              <option value="">--- Select Complaint Type ---</option>
              <option value="workplace">Workplace Issue</option>
              <option value="payroll">Payroll Issue</option>
              <option value="harassment">Harassment</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Complaint Subject */}
          <div className="relative">
            <i className="fa fa-envelope text-sm absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Complaint Subject"
              autoComplete="off"
              className="w-full bg-gray-100 text-gray-800 text-sm p-4 rounded-full border border-gray-300 pl-12 focus:ring-2 focus:ring-blue-500"
              {...register("complainSubject", {
                required: "Complaint subject is required",
              })}
            />
          </div>

          {/* Complaint Details */}
          <div className="relative">
            <textarea
              placeholder="Complaint Details"
              rows="4"
              className="w-full bg-gray-100 text-gray-800 text-sm p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              {...register("complaintDetails", {
                required: "Complaint details are required",
              })}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-sm p-4 rounded-full font-medium hover:bg-blue-600 transition duration-300"
          >
            {loading ? (
              <ClipLoader size={10} color="white" loading={loading} />
            ) : (
              "Submit Complaint"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Complaint;
