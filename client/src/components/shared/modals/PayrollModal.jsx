import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePayroll } from "../../../services/payroll.service";

const PayrollModal = ({ onClose, payroll }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    allowances: payroll?.allowances || 0,
    bonuses: payroll?.bonuses || 0,
    deductions: payroll?.deductions || 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value) || 0,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePayroll({
        id: payroll._id,
        formData,
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black w-[90%] sm:max-w-xl p-6 border border-gray-300 rounded-lg shadow-xl space-y-5"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h2 className="font-bold text-gray-600">Update Payroll</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Allowances */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Allowances
          </label>
          <input
            type="number"
            name="allowances"
            value={formData.allowances}
            onChange={handleChange}
            className="w-full bg-[#EFEFEF] text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
            min="0"
          />
        </div>

        {/* Bonuses */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bonuses
          </label>
          <input
            type="number"
            name="bonuses"
            value={formData.bonuses}
            onChange={handleChange}
            className="w-full bg-[#EFEFEF] text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
            min="0"
          />
        </div>

        {/* Deductions */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deductions
          </label>
          <input
            type="number"
            name="deductions"
            value={formData.deductions}
            onChange={handleChange}
            className="w-full bg-[#EFEFEF] text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-[500] pl-12"
            min="0"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full flex justify-end pt-4">
          <button
            type="submit"
            className="bg-blue-500 w-full text-white text-sm p-4 font-semibold rounded-3xl shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
          >
            Update Payroll
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayrollModal;
