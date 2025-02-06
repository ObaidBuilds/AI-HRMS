import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../../context";

const FilterBar = ({ isOpen, hideFilterBar, handleApplyFilters }) => {
  const { theme } = useTheme();

  const [filters, setFilters] = useState({
    department: "",
    role: "",
    status: "",
    name: "",
    departmentName: "",
    roleName: "",
  });
  const [toggleState, setToggleState] = useState({
    department: true,
    position: true,
    status: true,
  });

  const departments = useSelector((state) => state.department.departments);
  const role = useSelector((state) => state.role.roles);
  const statuses = ["Active", "Inactive", "Leave"];

  const handleToggle = (filterName) => {
    setToggleState((prevState) => ({
      ...prevState,
      [filterName]: !prevState[filterName],
    }));
  };

  const handleCheckboxChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: prevFilters[filterName] === value ? null : value,
    }));
  };

  return (
    <>
      <aside
        id="overflow"
        className={`filter_bar fixed z-50 top-0 right-0 w-[75%] sm:w-[380px] h-screen overflow-y-auto ${
          theme === "light"
            ? "bg-gradient-to-r from-[#0a2540] to-[#1d3557]"
            : "bg-gradient-to-br from-[#1E293B] to-[#334155]"
        }  text-white p-5 shadow-2xl transform transition-transform duration-300 backdrop-blur-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-500">
          <img src="/metro.png" className="w-[50px]" alt="" />
          <button
            className="text-gray-300 hover:text-white transition duration-200"
            onClick={() => hideFilterBar(false)}
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>
        <div>
          {/* Department Filter */}
          <div className="h-auto border-b border-gray-600 pt-4">
            <div
              className="flex justify-between items-center mb-5 cursor-pointer"
              onClick={() => handleToggle("department")}
            >
              <h1 className="text-sm font-medium">Department</h1>
              {toggleState.department ? (
                <i className="fas fa-chevron-up text-xs"></i>
              ) : (
                <i className="fas fa-chevron-down text-xs"></i>
              )}
            </div>
            {toggleState.department && (
              <div>
                {departments.map((department) => (
                  <div
                    className="flex gap-2 items-center pb-5"
                    key={department._id}
                  >
                    <input
                      type="checkbox"
                      className="w-[10px] h-[9px] cursor-pointer"
                      checked={filters.department === department._id}
                      onChange={() => {
                        handleCheckboxChange("department", department._id);
                        handleCheckboxChange("departmentName", department.name);
                      }}
                    />
                    <p className="text-[0.83rem] font-medium">
                      {department.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Position Filter */}
          <div className="h-auto py-1 mt-1 border-b border-gray-600">
            <div
              className="flex justify-between items-center my-3 cursor-pointer"
              onClick={() => handleToggle("position")}
            >
              <h1 className="text-sm pb-2 font-medium">Position</h1>
              {toggleState.position ? (
                <i className="fas fa-chevron-up text-xs"></i>
              ) : (
                <i className="fas fa-chevron-down text-xs"></i>
              )}
            </div>
            {toggleState.position && (
              <div>
                {role.map((role) => (
                  <div className="flex gap-2 items-center pb-5" key={role._id}>
                    <input
                      type="checkbox"
                      className="w-[10px] h-[9px] cursor-pointer"
                      checked={filters.role === role._id}
                      onChange={() => {
                        handleCheckboxChange("role", role._id);
                        handleCheckboxChange("roleName", role.name);
                      }}
                    />
                    <p className="text-[0.83rem] font-medium">{role.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="h-auto">
            <div
              className="flex justify-between items-center my-5 cursor-pointer"
              onClick={() => handleToggle("status")}
            >
              <h1 className="text-sm font-medium">Status</h1>
              {toggleState.status ? (
                <i className="fas fa-chevron-up text-xs"></i>
              ) : (
                <i className="fas fa-chevron-down text-xs"></i>
              )}
            </div>
            {toggleState.status && (
              <div>
                {statuses.map((status) => (
                  <div className="flex gap-2 items-center pb-5" key={status}>
                    <input
                      type="checkbox"
                      className="w-[10px] h-[9px] cursor-pointer"
                      checked={filters.status === status}
                      onChange={() => handleCheckboxChange("status", status)}
                    />
                    <p className="text-[0.83rem] font-medium">{status}</p>
                  </div>
                ))}
              </div>
            )}
            <button
              className="w-full sm:mb-0 text-sm font-medium rounded-full border border-blue-800 bg-blue-700 hover:bg-blue-800 p-3 mt-3 flex items-center justify-center gap-2 transition-all duration-300"
              onClick={() => handleApplyFilters(filters)}
            >
              <i className="fas fa-filter"></i>
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900 opacity-15 z-40 transition-all duration-300"
          onClick={() => hideFilterBar(false)}
        ></div>
      )}
    </>
  );
};

export default FilterBar;
