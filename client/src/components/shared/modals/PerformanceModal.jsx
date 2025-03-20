import React, { useState } from "react";
import { updatePerformance } from "../../../services/performance.service";
import { useDispatch } from "react-redux";

const PerformanceModal = ({ onClose, performance }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    rating: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      rating: parseInt(formData.rating),
      feedback: formData.feedback,
      kpis: performance.kpis,
    };

    dispatch(
      updatePerformance({ id: performance._id, performance: formattedData })
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
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h2 className="font-bold text-gray-600">Review & Rating</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Rating Dropdown */}
        <div className="w-full relative">
          <i className="fa fa-building-columns text-sm icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
          <select
            id="select"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full bg-[#EFEFEF] text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
            required
          >
            <option value="">--- Select Rating ---</option>
            <option value="5">5 Star</option>
            <option value="4">4 Star</option>
            <option value="3">3 Star</option>
            <option value="2">2 Star</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {/* Feedback Textarea */}
        <div className="w-full">
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Write your feedback"
            className="w-full p-4 bg-[#EFEFEF] text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 resize-none"
            rows={4}
            required
          />
        </div>

        {/* Submit Button */}
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

export default PerformanceModal;
