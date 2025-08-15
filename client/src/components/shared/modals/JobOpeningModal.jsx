import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateJob } from "../../../services/recruitment.service";

const JobOpeningModal = ({ onClose, job }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    status: job.status,
    deadline: job.deadline.split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      status: formData.status,
      deadline: formData.deadline,
    };

    dispatch(updateJob({ id: job._id, job: formattedData }));

    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <form
        id="modal"
        onSubmit={handleSubmit}
        className="bg-white text-black w-[90%] sm:max-w-xl p-6 border border-gray-300 rounded-lg shadow-xl space-y-5"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h2 className="font-bold text-gray-600">Update Job Opening</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        <div className="w-full relative">
          <i className="fa fa-building-columns text-sm icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
          <select
            id="select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-[#EFEFEF] text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
            required
          >
            <option value="">--- Select Status ---</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        <div className="w-full">
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full bg-[#EFEFEF] text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
          />
        </div>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 w-full text-white text-sm p-4 font-semibold rounded-3xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobOpeningModal;
