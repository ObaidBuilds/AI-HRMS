import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "../../components/shared/Error";
import Loader from "../../components/shared/Loader";
import Heading from "../../components/shared/Heading";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../../components/shared/FilterBar";
import Pagination from "../../components/shared/Pagination";
import { deleteEmployee, getAllEmployees } from "../../services/employee";
import Modal from "../../components/shared/Modal";

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
    position: null,
    status: null,
  });

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

        {/* <button
          onClick={() => setToggleFilterBar(!toggleFilterBar)}
          className="w-full  sm:w-[150px] flex justify-center items-center gap-3 text-[0.9rem] border border-gray-700 bg-gray-800 shadow-md rounded-md p-4 mb-3"
        >
          <i class="fas fa-filter"></i>
          Apply Filters
        </button> */}

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
