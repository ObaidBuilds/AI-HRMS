import React, { useState } from "react";

const Complaint = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Complaint Submitted!");
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="h-[90vh] flex justify-center items-center text-white">
      <div className="w-full sm:w-[95%] rounded-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Submit Your Complaint
          </h1>

       
        </div>

        <form className="space-y-3 sm:space-y-4 text-sm" onSubmit={handleSubmit}>
          {/* Complaint Type */}
          <div className="relative">
            <i className="fa fa-list-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <select
              id="select"
              className="w-full bg-gray-700 text-center text-sm p-3 rounded-full border border-gray-600 pl-12 focus:ring-2 focus:ring-blue-500"
              required
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
              className="w-full bg-gray-700 text-sm p-3 rounded-full border border-gray-600 pl-12 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Complaint Details */}
          <div className="relative">
            <textarea
              placeholder="Complaint Details"
              rows="4"
              className="w-full bg-gray-700 text-sm p-3 rounded-xl border border-gray-600 focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-sm p-4 rounded-full font-medium hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Complaint;
