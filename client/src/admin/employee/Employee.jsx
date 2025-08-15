import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { downloadXls } from "../../utils";
import { empoyeeHead } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import Error from "../../components/shared/error/Error";
import Modal from "../../components/shared/modals/Modal";
import Loader from "../../components/shared/loaders/Loader";
import FilterBar from "../../components/shared/others/FilterBar";
import Pagination from "../../components/shared/others/Pagination";
import {
  deleteEmployee,
  getAllEmployees,
} from "../../services/employee.service";
import FetchError from "../../components/shared/error/FetchError";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import ImportExcelModal from "../../components/shared/modals/ImportExcelModal";

function Employee() {
  const dispatch = useDispatch();

  const { employees, pagination, loading, error } = useSelector(
    (state) => state.employee
  );

  const [uiState, setUiState] = useState({
    toggleFilterBar: false,
    toggleModal: false,
    toggleExcelModal: false,
    deletedEmployee: null,
    exportLoading: false,
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
    setUiState((prev) => ({ ...prev, exportLoading: true }));

    const data = employees.map((employee) => ({
      EmployeeID: employee.employeeId,
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

    setTimeout(() => {
      downloadXls(data);
      setUiState((prev) => ({ ...prev, exportLoading: false }));
    }, 2000);
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

  const renderFilters = Object.keys(filters)
    .filter(
      (key) => filters[key] && key !== "departmentName" && key !== "roleName"
    )
    .map((key) => (
      <button
        key={key}
        className="flex justify-between items-center gap-2 text-[0.9rem] border border-gray-300 py-1 px-5 rounded-2xl hover:border-blue-500 hover:bg-blue-100 hover:text-blue-600 
   dark:hover:border-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500  transition-all  ease-in-out duration-300"
      >
        {filters[key + "Name"] || filters[key]}
        <i
          onClick={() => clearFilter(key)}
          className="fa-solid fa-close text-xs cursor-pointer"
        ></i>
      </button>
    ));

  useEffect(() => {
    dispatch(getAllEmployees({ currentPage: uiState.currentPage, filters }));
  }, [dispatch, uiState.currentPage, filters]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", uiState.toggleFilterBar);
  }, [uiState.toggleFilterBar]);

  if (!employees) return <Error />;

  return (
    <>
      <Helmet>
        <title>Employees - Metro HR</title>
      </Helmet>

      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg sm:min-h-screen shadow">
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
              className="hidden sm:flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold border-gray-300 hover:border-blue-500 hover:bg-blue-100 text-gray-700 dark:text-gray-300 hover:text-blue-600 
   dark:hover:border-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500  transition-all  ease-in-out duration-300"
            >
              <i className="fa-solid fa-filter text-xs"></i> Apply Filters
            </button>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {renderFilters}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportToExcel}
              className="hidden sm:flex justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border border-gray-300 py-1 px-5 rounded-3xl font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:bg-blue-100 hover:text-blue-600 
   dark:hover:border-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500  transition-all  ease-in-out duration-300"
            >
              {uiState.exportLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-file-excel text-xs"></i>
              )}
              {uiState.exportLoading ? " Exporting..." : "Export to Excel"}
            </button>
            <button
              onClick={() =>
                setUiState((prev) => ({ ...prev, toggleExcelModal: true }))
              }
              className="hidden sm:flex justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border border-gray-300 py-1 px-5 rounded-3xl font-semibold text-gray-700 dark:text-gray-300  hover:border-blue-500 hover:bg-blue-100 hover:text-blue-600 
   dark:hover:border-blue-500 dark:hover:bg-transparent dark:hover:text-blue-500  transition-all  ease-in-out duration-300"
            >
              <i className="fas fa-file-excel  text-xs"></i> Import from Excel
            </button>
          </div>
        </div>

        {/* Employee Table */}
        <div
          id="overflow"
          className="overflow-x-auto min-h-[74vh] sm:min-h-[80vh]"
        >
          <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
            <thead>
              <tr className="bg-headLight dark:bg-head text-primary">
                {empoyeeHead.map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 border-b border-secondary"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 &&
                employees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.admin && (
                        <i className="fa-solid fa-crown text-[gold] mr-2"></i>
                      )}
                      EMP {employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.department?.name || "--"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.role?.name || "--"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.status}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {employee.phoneNumber}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary flex items-center space-x-2">
                      <Link to={`/employee/${employee._id}`}>
                        <button
                          className="text-blue-500 hover:text-blue-400"
                          title="View"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </Link>

                      <Link to={`/employee/update/${employee._id}`}>
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
                ))}
            </tbody>
          </table>

          {!loading && !error && employees.length === 0 && (
            <NoDataMessage message={"No employee found"} />
          )}

          {error && <FetchError error={error} />}
        </div>

        {!loading && employees.length > 0 && (
          <Pagination {...pagination} onPageChange={goToPage} />
        )}

        {uiState.toggleFilterBar && (
          <FilterBar
            isOpen={uiState.toggleFilterBar}
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

        {uiState.toggleExcelModal && (
          <ImportExcelModal
            onClose={() =>
              setUiState((prev) => ({ ...prev, toggleExcelModal: false }))
            }
          />
        )}
      </section>
    </>
  );
}

export default Employee;
