import React, { useState } from "react";

const RemarksModal = ({ onClose, isConfirm }) => {

  const [remarks, setRemarks] = useState("")

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div
        id="modal"
        className="border-gray-900 bg-white text-gray-800 p-4 rounded-lg w-[92%] md:w-[400px] max-w-md"
      >
        <h3
          className="text-lg border-b border-gray-300 pb-2 font-bold mb-4"
          id="modal-title"
        >
          Add Remarks
        </h3>
        <div className="w-full">
          <div className="w-full relative">
            <i className="fa fa-calendar text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Write you remarks"
              className="w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
              required
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => isConfirm(remarks)}
            id="modal-confirm"
            className="bg-blue-500 text-sm text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            id="modal-cancel"
            className="bg-gray-500 text-sm font-semibold text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemarksModal;
