import React from "react";

const SheetModal = ({
  onClose,
  departments,
  selectedDepartment,
  setSelectedDepartment,
  selectedDate,
  setSelectedDate,
  handleModalSubmit,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <form
        id="modal"
        onSubmit={handleModalSubmit}
        className="bg-white text-black w-[95%] sm:max-w-lg p-6 border border-gray-300 rounded-lg shadow-xl space-y-6"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h2 className="text-xl font-semibold text-gray-700">
            Select Options
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Department Dropdown */}
        <div className="w-full">
          <label
            htmlFor="department"
            className="text-sm text-gray-600 mb-2 block"
          >
            Select Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            id="department"
            className="w-full text-sm bg-gray-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-indigo-500 focus:bg-white"
            required
          >
            <option value="">--Select Department--</option>
            {departments &&
              departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="w-full">
          <label htmlFor="date" className="text-sm text-gray-600 mb-2 block">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full text-sm bg-gray-100 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-indigo-500 focus:bg-white"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SheetModal;
