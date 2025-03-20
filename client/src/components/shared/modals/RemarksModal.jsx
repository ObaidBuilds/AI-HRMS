import React, { useState } from "react";

const RemarksModal = ({ onClose, isConfirm }) => {
  const [remarks, setRemarks] = useState("");

  return (
    <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        id="modal"
        className="bg-white text-gray-700 p-6 rounded-lg w-[90%] md:w-[550px] max-w-md shadow-lg"
      >
        <h3 className="text-lg font-bold border-b border-gray-300 pb-3 mb-4">
          Add Remarks
        </h3>

        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Write your remarks"
          className="w-full p-4 bg-[#EFEFEF] text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 resize-none"
          rows={4}
          required
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => isConfirm(remarks)}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemarksModal;
