import { Link } from "react-router-dom";
import { downloadXls } from "../../utils";
import { useEffect, useState } from "react";
import Error from "../../components/shared/Error";
import Modal from "../../components/shared/Modal";
import Loader from "../../components/shared/Loader";
import Heading from "../../components/shared/Heading";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../../components/shared/FilterBar";
import Pagination from "../../components/shared/Pagination";
import { deleteEmployee, getAllEmployees } from "../../services/employee";

function Employee() {
  const dispatch = useDispatch();

  const { employees, pagination, loading } = useSelector(
    (state) => state.employee
  );

  const [toggleFilterBar, setToggleFilterBar] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [deletedEmployee, setDeletedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    department: null,
    role: null,
    status: null,
    departmentName: null,
    roleName: null,
  });
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const goToPage = (page) => setCurrentPage(page);

  const onApplyFilters = (newFilters) => setFilters(newFilters);

  const confirmation = () => {
    deleteEmployee(dispatch, deletedEmployee._id);
    setDeletedEmployee(null);
    setToggleModal(false);
  };

  useEffect(() => {
    getAllEmployees(dispatch, currentPage, filters);
  }, [dispatch, currentPage, filters]);

  const handleExportToExcel = () => {
    const data = employees.map((employee) => ({
      EmployeeID: `EMP ${employee.employeeId}`,
      Name: employee.name,
      DateOfBirth: employee.dob,
      Email: employee.email,
      PhoneNumber: employee.phoneNumber,
      Address: `${employee.address.street}, ${employee.address.city}, ${employee.address.state}, ${employee.address.postalCode}, ${employee.address.country}`,
      DateOfJoining: employee.dateOfJoining,
      Gender: employee.gender,
      MaritalStatus: employee.martialStatus,
      Department: employee.department.name,
      Position: employee.role.name,
      EmploymentType: employee.employmentType,
      Shift: employee.shift,
      Status: employee.status,
      Salary: employee.salary,
      BankDetails: `${employee.bankDetails.accountNumber} - ${employee.bankDetails.bankName}`,
      EmergencyContact: `${employee.emergencyContact.name} (${employee.emergencyContact.relationship}) - ${employee.emergencyContact.phoneNumber}`,
      LeaveBalance: employee.leaveBalance,
      Admin: employee.admin ? "Yes" : "No",
    }));

    downloadXls(data);
  };

  const clearFilter = (filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: null,
      [`${filterKey}Name`]: null,
    }));
  };

  if (!employees) {
    return <Error />;
  }

  return (
    <div className="w-full rounded-lg bg-gray-900">
      {loading && <Loader />}

      <Heading heading={"Employee Management 👥"} />

      <section className="bg-gray-700 mt-2 p-3 sm:p-4 rounded-lg">
        {toggleFilterBar && (
          <FilterBar
            hideFilterBar={setToggleFilterBar}
            onApplyFilters={onApplyFilters}
          />
        )}

        {toggleModal && (
          <Modal
            onClose={() => setToggleModal(false)}
            isConfirm={confirmation}
          />
        )}

        {/* Three-dot icon for dropdown aligned to the right */}
        <div className="relative flex items-center justify-between sm:px-3 mb-2">
          {!(filters.status || filters.department || filters.role) && (
            <button
              onClick={() => {
                setToggleFilterBar(true);
                setToggleDropdown(false);
              }}
              className="flex justify-between items-center gap-2 text-[0.8rem] sm:text-[0.9rem] border py-1 px-5 rounded-2xl font-semibold"
            >
              <i className="fa-solid fa-filter text-[0.7rem] sm:text-xs"></i>{" "}
              Apply Filters
            </button>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {filters.status && (
              <button className="flex flex-grow justify-between items-center gap-2 text-[0.9rem] border py-1 px-5 rounded-2xl">
                {filters.status}
                <i
                  onClick={() => clearFilter("status")}
                  className="fa-solid fa-close text-xs cursor-pointer"
                ></i>
              </button>
            )}
            {filters.department && (
              <button className="flex flex-grow justify-between items-center gap-2 text-[0.9rem] border py-1 px-5 rounded-2xl">
                {filters.departmentName}
                <i
                  onClick={() => clearFilter("department")}
                  className="fa-solid fa-close text-xs cursor-pointer"
                ></i>
              </button>
            )}
            {filters.role && (
              <button className="flex flex-grow justify-between items-center gap-2 text-[0.9rem] border py-1 px-5 rounded-2xl">
                {filters.roleName}
                <i
                  onClick={() => clearFilter("role")}
                  className="fa-solid fa-close text-xs cursor-pointer"
                ></i>
              </button>
            )}
          </div>
          <button
            className="text-gray-500 hover:text-gray-300 p-2"
            onClick={() => setToggleDropdown(!toggleDropdown)}
          >
            <i className="fa-solid fa-ellipsis-v"></i>
          </button>
          {toggleDropdown && (
            <div className="absolute right-2 top-6 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-10">
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => {
                      setToggleFilterBar(true);
                      setToggleDropdown(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-600"
                  >
                    <i className="fa-solid fa-filter mr-2"></i>
                    Apply Filters
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleExportToExcel();
                      setToggleDropdown(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-600"
                  >
                    <i className="fa-solid fa-file-excel mr-2"></i>
                    Export to Excel
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div id="overflow" className="overflow-x-auto min-h-[75vh]">
          <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
            <thead>
              <tr className="bg-gray-600 text-gray-200">
                <th className="py-3 px-4 border-b border-gray-500">
                  Employee ID
                </th>
                <th className="py-3 px-4 border-b border-gray-500">Name</th>
                <th className="py-3 px-4 border-b border-gray-500">
                  Department
                </th>
                <th className="py-3 px-4 border-b border-gray-500">Position</th>
                <th className="py-3 px-4 border-b border-gray-500">Status</th>
                <th className="py-3 px-4 border-b border-gray-500">
                  Contact Info
                </th>
                <th className="py-3 px-4 border-b border-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={index}
                  className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600"
                >
                  <td className="py-3 px-4 border-b border-gray-500">
                    EMP {employee.employeeId}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-500">
                    {employee.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-500">
                    {employee.department.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-500">
                    {employee.role.name}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-500">
                    {employee.status}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-500">
                    {employee.phoneNumber}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-500 flex items-center space-x-2">
                    <Link to={`/hrms/employee/${employee._id}`}>
                      <button
                        className="text-blue-500 hover:text-blue-400"
                        title="View"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                    </Link>

                    <Link to={`/hrms/edit-employee/${employee._id}`}>
                      <button
                        className="text-green-500 hover:text-green-400"
                        title="Edit"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        setDeletedEmployee(employee);
                        setToggleModal(!toggleModal);
                      }}
                      className="text-red-500 hover:text-red-400"
                      title="Delete"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={pagination?.totalPages}
          onPageChange={goToPage}
        />
      </section>
    </div>
  );
}

export default Employee;
