import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDepartment,
  getAllEmployeesForHead,
  updateDepartment,
} from "../../../services/department.service";

const DepartmentModal = ({ action, onClose, department }) => {
  const dispatch = useDispatch();
  const { heads } = useSelector((state) => state.department);

  const [formData, setFormData] = useState({
    name: "",
    head: "",
    description: "",
  });

  useEffect(() => {
    if (action === "update" && department) {
      setFormData({
        name: department.name || "",
        head: department?.head?._id || "",
        description:
          department.description ||
          "The Marketing Department is responsible for driving brand awareness",
      });
    }
  }, [action, department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "update")
      dispatch(updateDepartment({ id: department._id, department: formData }));
    else dispatch(createDepartment(formData));

    onClose();
  };

  useEffect(() => {
    dispatch(getAllEmployeesForHead());
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <form
        id="modal"
        onSubmit={handleSubmit}
        className="bg-white text-black w-[90%] sm:max-w-xl p-6 border border-gray-300 rounded-lg shadow-xl space-y-5"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <h2 className="font-bold text-gray-600">
            {action === "create" ? "Create" : "Update"} Department
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Department name */}
        <div className="w-full">
          <div className="w-full relative">
            <i className="fa fa-calendar text-sm absolute left-4 pl-1 top-1/2 transform -translate-y-1/2 text-gray-700"></i>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Department name"
              className="w-full bg-[#EFEFEF] text-sm sm:text-center p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-medium pl-12"
              required
            />
          </div>
        </div>

        {/* Head Dropdown */}
        <div className="w-full relative">
          <i className="fa fa-building-columns text-sm icon absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
          <select
            id="select"
            name="head"
            value={formData.head}
            onChange={handleChange}
            className="w-full bg-[#EFEFEF] text-center text-sm p-[17px] rounded-full focus:outline focus:outline-2 focus:outline-gray-700 font-medium pl-12"
            required
          >
            <option value="">--- Select Head ---</option>
            {heads.length > 0 &&
              heads.map((head) => (
                <option key={head._id} value={head._id}>
                  {head.name}
                </option>
              ))}
          </select>
        </div>

        {/* Description Textarea */}
        <div className="w-full">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your description"
            className="w-full p-4 bg-[#EFEFEF] text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 resize-none medium"
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

export default DepartmentModal;
