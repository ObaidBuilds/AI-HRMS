import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { complaintTypes } from "../../constants";
import { complaintSchema } from "../../validations";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComplaint } from "../../services/complaint.service";
import ButtonLoader from "../../components/shared/loaders/ButtonLoader";

const Complaint = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.complaint);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(complaintSchema),
  });

  const onSubmit = (data) => {
    dispatch(createComplaint(data))
      .unwrap()
      .then(() => reset())
      .catch((error) => console.error("Error creating complaint:", error));
  };

  return (
    <>
      <Helmet>
        <title>Report Complaint - Metro HR</title>
      </Helmet>

      <section className="h-[90vh] sm:h-screen overflow-hidden bg-gray-50">
        <main className="flex justify-center items-center w-full h-full text-black font-medium">
          <div className="w-[94%] sm:w-[490px] rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <div className="flex flex-col items-center py-8">
              <h1 className="text-[1.3rem] mt-3 font-extrabold flex items-center gap-2">
                <i className="fas fa-circle-exclamation"></i>
                Report an Issue
              </h1>
            </div>

            <form
              className="flex flex-col items-center gap-2 pb-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-[85%] relative">
                <select
                  id="select"
                  {...register("complainType")}
                  className={`w-full bg-[#EFEFEF] text-center text-sm p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]
                  ${errors.complainType && "border border-red-500"}
                  `}
                  disabled={loading}
                >
                  {complaintTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.complainType && (
                  <p className="text-red-500 text-xs mt-1 ml-3">
                    {errors.complainType.message}
                  </p>
                )}
              </div>

              <div className="w-[85%]">
                <input
                  type="text"
                  placeholder="Complaint Subject"
                  autoComplete="off"
                  {...register("complainSubject")}
                  className={`w-full bg-[#EFEFEF] text-sm text-center p-[18px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500]
                  ${errors.complainSubject && "border border-red-500"}
                  `}
                  disabled={loading}
                />
                {errors.complainSubject && (
                  <p className="text-red-500 text-xs mt-1 ml-3">
                    {errors.complainSubject.message}
                  </p>
                )}
              </div>

              <div className="w-[85%]">
                <textarea
                  placeholder="Complaint Details"
                  rows="4"
                  {...register("complaintDetails")}
                  className={`w-full bg-[#EFEFEF] text-sm p-[18px] rounded-lg focus:outline focus:outline-2 focus:outline-gray-700 font-[500]
                  ${errors.complaintDetails && "border border-red-500"}
                  `}
                  disabled={loading}
                ></textarea>
                {errors.complaintDetails && (
                  <p className="text-red-500 text-xs mt-1 ml-3">
                    {errors.complaintDetails.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-[85%] rounded-full bg-blue-600 p-4 text-sm text-white transition hover:bg-blue-700"
              >
                {loading ? (
                  <span className="flex items-center justify-center text-[0.8rem]">
                    <ButtonLoader />
                    Submitting
                  </span>
                ) : (
                  "Submit Complaint"
                )}
              </button>
            </form>
          </div>
        </main>
      </section>
    </>
  );
};

export default Complaint;
