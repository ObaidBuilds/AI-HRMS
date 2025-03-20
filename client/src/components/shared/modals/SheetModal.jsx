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
    <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <form
        id="modal"
        onSubmit={handleModalSubmit}
        className="bg-white text-black w-[90%] sm:max-w-lg p-6 border border-gray-300 rounded-lg shadow-xl space-y-5"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h2 className="font-bold text-gray-600 text-[0.95rem]">
            Department & Date
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="w-full relative">
          <i className="fa fa-building-columns text-sm icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            id="select"
            className="w-full bg-[#EFEFEF] text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
            required
          >
            <option value="">--- Select Depart ---</option>
            {departments &&
              departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full">
          <div className="w-full relative">
            <i className="fa fa-calendar text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-400 font-[500] pl-12"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 w-full text-white text-sm p-4 font-semibold rounded-3xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Get Sheet
          </button>
        </div>
      </form>
    </div>
  );
};

export default SheetModal;
