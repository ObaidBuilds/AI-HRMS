import React, { useState } from "react";

const Leave = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(
        `Leave Application Submitted!\nLeave Type: ${e.target.leaveType.value}\nDuration: ${e.target.duration.value}\nFrom: ${e.target.fromDate.value}\nTo: ${e.target.toDate.value}`
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="h-[90vh] flex justify-center items-center text-white">
      <div className="w-full sm:w-[95%] rounded-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Apply for Leave
          </h1>
        </div>

        <form className="space-y-3 sm:space-y-4 text-sm" onSubmit={handleSubmit}>
          {/* Leave Type Select */}
          <div className="relative">
            <i className="fa fa-calendar-check text-sm absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <select
              id="select"
              name="leaveType"
              className="w-full bg-gray-700 text-center text-sm p-3 rounded-full border border-gray-600 pl-12 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">--- Select Leave Type ---</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="vacation">Vacation Leave</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Duration */}
          <div className="relative">
            <i className="fa fa-clock text-sm absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              name="duration"
              placeholder="Duration (in days)"
              autoComplete="off"
              className="w-full bg-gray-700 text-sm p-3 rounded-full border border-gray-600 pl-12 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* From Date */}
          <div className="relative">
            <i className="fa fa-calendar text-sm absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="date"
              name="fromDate"
              className="w-full bg-gray-700 text-sm p-3 rounded-full border border-gray-600 pl-12 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* To Date */}
          <div className="relative">
            <i className="fa fa-calendar text-sm absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="date"
              name="toDate"
              className="w-full bg-gray-700 text-sm p-3 rounded-full border border-gray-600 pl-12 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-sm p-4 rounded-full font-medium hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Submitting..." : "Submit Leave Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Leave;
