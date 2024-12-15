import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

const FilterBar = ({ hideFilterBar, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    department: "",
    role: "",
    status: "",
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

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    hideFilterBar(false);
  };

  return (
    <section className="fixed bg-gray-900 bg-opacity-20 inset-0 z-50">
      <aside
        id="overflow"
        className="w-[75%] h-screen overflow-auto sm:w-[350px] rounded-md p-5 md:mb-0 bg-gray-800 font-bold fixed top-[70px] sm:top-0 right-0 z-50"
      >
        <div className="w-full pb-4 mb-4 border-b border-gray-600">
          <div
            onClick={() => hideFilterBar(false)}
            className="w-[20px] h-[20px] text-black bg-gray-300 flex justify-center items-center rounded-full cursor-pointer"
          >
            <FaTimes className="text-sm" />
          </div>
        </div>
        <div>
          {/* Department Filter */}
          <div className="h-auto border-b border-gray-500 pt-1">
            <div
              className="flex justify-between items-center mb-5 cursor-pointer"
              onClick={() => handleToggle("department")}
            >
              <h1 className="text-sm font-medium">Department</h1>
              {toggleState.department ? (
                <FaChevronUp className="text-xs" />
              ) : (
                <FaChevronDown className="text-xs" />
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
          <div className="h-auto py-1 mt-1 border-b border-gray-500">
            <div
              className="flex justify-between items-center my-3 cursor-pointer"
              onClick={() => handleToggle("position")}
            >
              <h1 className="text-sm pb-2 font-medium">Position</h1>
              {toggleState.position ? (
                <FaChevronUp className="text-xs" />
              ) : (
                <FaChevronDown className="text-xs" />
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
                <FaChevronUp className="text-xs" />
              ) : (
                <FaChevronDown className="text-xs" />
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
              className="w-full mb-[70px] sm:mb-0 text-sm sm:text-base border border-gray-600 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 hover:bg-gradient-to-r hover:from-blue-800 hover:via-blue-700 hover:to-blue-600 p-3 rounded-lg mt-3"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default FilterBar;
