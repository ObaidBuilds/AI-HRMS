import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLeave } from "../../services/leave.service";
import { leaveSchema } from "../../validations";

const Leave = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.leave);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leaveSchema),
  });

  const onSubmit = (data) => {
    dispatch(createLeave(data))
      .unwrap()
      .then(() => reset())
      .catch((error) => console.error("Error creating leave:", error));
  };

  return (
    <section className="h-screen overflow-hidden bg-gray-50">
      <main className="flex justify-center items-center w-full h-screen text-black font-medium">
        <div className="w-[88%] sm:w-[490px] rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col items-center py-5">
            <h1 className="text-xl mt-3 font-extrabold">Apply for Leave</h1>
          </div>

          <form
            className="flex flex-col items-center gap-2 pb-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Leave Type */}
            <div className="w-[85%] relative">
              <select
                id="select"
                {...register("leaveType")}
                className="w-full bg-[#EFEFEF] text-center text-sm p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]"
              >
                <option value="">--- Select Leave Type ---</option>
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
                <option value="Vacation">Vacation Leave</option>
                <option value="Unpaid">Unpaid</option>
              </select>
              {errors.leaveType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.leaveType.message}
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="w-[85%]">
              <input
                type="number"
                placeholder="Duration (in days)"
                {...register("duration")}
                className="w-full bg-[#EFEFEF] text-sm text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]"
              />
              {errors.duration && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* From Date */}
            <div className="w-[85%]">
              <input
                type="date"
                {...register("fromDate")}
                className="w-full bg-[#EFEFEF] text-sm text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]"
              />
              {errors.fromDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fromDate.message}
                </p>
              )}
            </div>

            {/* To Date */}
            <div className="w-[85%]">
              <input
                type="date"
                {...register("toDate")}
                className="w-full bg-[#EFEFEF] text-sm text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]"
              />
              {errors.toDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.toDate.message}
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
                "Submit Leave Application"
              )}
            </button>
          </form>
        </div>
      </main>
    </section>
  );
};

export default Leave;
