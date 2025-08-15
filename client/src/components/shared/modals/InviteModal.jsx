import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { inviteForInterview } from "../../../services/recruitment.service";

const InviteModal = ({ onClose, application, jobId }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    interviewDate: new Date().toISOString().split("T")[0],
    interviewTime: "10:00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      inviteForInterview({
        jobId: jobId,
        applicationId: application._id,
        interviewDetails: formData,
      })
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <form
        id="modal"
        onSubmit={handleSubmit}
        className="bg-white text-black w-[90%] sm:max-w-xl p-6 border border-gray-300 rounded-lg shadow-xl space-y-5"
      >
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h2 className="font-bold text-gray-600">Invite For Interview</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        <div className="w-full relative">
          <i className="far fa-calendar-alt text-sm icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            className="w-full bg-[#EFEFEF] text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="w-full relative">
          <i className="far fa-clock text-sm icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
          <input
            type="time"
            name="interviewTime"
            value={formData.interviewTime}
            onChange={handleChange}
            className="w-full bg-[#EFEFEF] text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
            required
          />
        </div>

        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 w-full text-white text-sm p-4 font-semibold rounded-3xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Send Invitation
          </button>
        </div>
      </form>
    </div>
  );
};

export default InviteModal;
