import { Link } from "react-router-dom";
import { downloadXls } from "../../utils";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../components/shared/error/Error";
import Modal from "../../components/shared/modals/Modal";
import Loader from "../../components/shared/loaders/Loader";
import FilterBar from "../../components/shared/others/FilterBar";
import Pagination from "../../components/shared/others/Pagination";
import { deleteEmployee, getAllEmployees } from "../../services/employee";

function Employee() {
  const dispatch = useDispatch();
  const { employees, pagination, loading } = useSelector(
    (state) => state.employee
  );

  const [uiState, setUiState] = useState({
    toggleFilterBar: false,
    toggleModal: false,
    deletedEmployee: null,
    currentPage: 1,
  });

  const [filters, setFilters] = useState({
    department: "",
    role: "",
    status: "",
    name: "",
    departmentName: "",
    roleName: "",
  });

  const goToPage = (page) =>
    setUiState((prev) => ({ ...prev, currentPage: page }));

  const confirmation = useCallback(() => {
    dispatch(deleteEmployee(uiState.deletedEmployee._id));
    setUiState((prev) => ({
      ...prev,
      deletedEmployee: null,
      toggleModal: false,
    }));
  }, [dispatch, uiState.deletedEmployee]);

  const handleExportToExcel = useCallback(() => {
    const data = employees.map((employee) => ({
      EmployeeID: `EMP ${employee.employeeId}`,
      Name: employee.name,
      DateOfBirth: employee.dob,
      Email: employee.email,
      PhoneNumber: employee.phoneNumber,
      Address: `${employee.address.street}, ${employee.address.city}, ${employee.address.state}, ${employee.address.postalCode}, ${employee.address.country}`,
      DateOfJoining: employee.dateOfJoining,
      Gender: employee.gender,
      MaritalStatus: employee.maritalStatus,
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
  }, [employees]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setUiState((prev) => ({ ...prev, toggleFilterBar: false }));
  };

  const clearFilter = (filterKey) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: "",
      [`${filterKey}Name`]: "",
    }));
  };

  useEffect(() => {
    dispatch(getAllEmployees({ currentPage: uiState.currentPage, filters }));
  }, [dispatch, uiState.currentPage, filters]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", uiState.toggleFilterBar);
  }, [uiState.toggleFilterBar]);

  const renderFilters = Object.keys(filters)
    .filter(
      (key) => filters[key] && key !== "departmentName" && key !== "roleName"
    )
    .map((key) => (
      <button
        key={key}
        className="flex justify-between items-center gap-2 text-[0.9rem] border py-1 px-5 rounded-2xl"
      >
        {filters[key + "Name"] || filters[key]}
        <i
          onClick={() => clearFilter(key)}
          className="fa-solid fa-close text-xs cursor-pointer"
        ></i>
      </button>
    ));

  if (!employees) return <Error />;

  return (
    <>
      {loading && <Loader />}

      <section className="bg-secondary p-3 sm:p-4 rounded-lg w-full h-auto">
        {uiState.toggleFilterBar && (
          <FilterBar
            handleApplyFilters={handleApplyFilters}
            hideFilterBar={() =>
              setUiState((prev) => ({ ...prev, toggleFilterBar: false }))
            }
          />
        )}

        {uiState.toggleModal && (
          <Modal
            onClose={() =>
              setUiState((prev) => ({ ...prev, toggleModal: false }))
            }
            action={"delete"}
            isConfirm={confirmation}
          />
        )}

        <div className="relative flex gap-1 items-center justify-between py-1 sm:px-3 mb-3">
          {!(
            filters.status ||
            filters.department ||
            filters.role ||
            filters.name
          ) && (
            <button
              onClick={() =>
                setUiState((prev) => ({ ...prev, toggleFilterBar: true }))
              }
              className="flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold"
            >
              <i className="fa-solid fa-filter text-[0.7rem] sm:text-xs"></i>{" "}
              Apply Filters
            </button>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {renderFilters}
          </div>

          <button
            onClick={handleExportToExcel}
            className="hidden sm:flex justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold"
          >
            <i className="fas fa-file-excel text-[0.7rem] text-xs"></i> Export
            to Excel
          </button>
        </div>

        <div
          id="overflow"
          className="overflow-x-auto  min-h-[68vh] sm:min-h-[75vh]"
        >
          <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
            <thead>
              <tr className="bg-gray-600 text-gray-200">
                {[
                  "Employee ID",
                  "Name",
                  "Department",
                  "Position",
                  "Status",
                  "Contact Info",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 border-b border-gray-500"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.length >= 1 ? (
                employees.map((employee) => (
                  <tr
                    key={employee._id}
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
                      <Link to={`/employee/${employee._id}`}>
                        <button
                          className="text-blue-500 hover:text-blue-400"
                          title="View"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </Link>

                      <Link to={`/edit-employee/${employee._id}`}>
                        <button
                          className="text-green-500 hover:text-green-400"
                          title="Edit"
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                      </Link>

                      <button
                        onClick={() =>
                          setUiState((prev) => ({
                            ...prev,
                            deletedEmployee: employee,
                            toggleModal: true,
                          }))
                        }
                        className="text-red-500 hover:text-red-400"
                        title="Delete"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="w-full h-[50vh] text-center">
                    <div className="flex flex-col justify-center items-center">
                      <i className="fas fa-ban text-2xl text-gray-400"></i>
                      <p className="mt-2 text-base text-gray-400">
                        No employees found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination {...pagination} onPageChange={goToPage} />
      </section>
    </>
  );
}

export default Employee;
