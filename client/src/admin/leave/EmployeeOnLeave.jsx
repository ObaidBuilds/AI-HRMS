import { useEffect, useState } from "react";
import { convertDate, formatDate } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import FetchError from "../../components/shared/error/FetchError";
import { getEmployeesOnLeave } from "../../services/leave.service";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";
import { employeesOnLeaveButtons, leaveEmpoyeeHead } from "../../constants";
import SubstituteModal from "../../components/shared/modals/SubstituteModal";

function EmployeeOnLeave() {
  const dispatch = useDispatch();

  const { employeesOnLeaveToday, loading, error } = useSelector(
    (state) => state.leave
  );

  const [status, setStatus] = useState("Present");
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  function handleSubstituteAssign(id) {
    setSelectedLeave(id);
    setToggleModal(true);
  }

  useEffect(() => {
    const dateMapping = {
      Yesterday: new Date(new Date().setDate(new Date().getDate() - 1)),
      Present: new Date(),
      Tomorrow: new Date(new Date().setDate(new Date().getDate() + 1)),
    };

    dispatch(getEmployeesOnLeave(convertDate(dateMapping[status])));
  }, [status, dispatch]);

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {employeesOnLeaveButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setStatus}
              state={status}
              filter={filter}
            />
          ))}
        </div>
        <div
          id="overflow"
          className="overflow-x-auto min-h-[70vh] sm:min-h-[78vh]"
        >
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-headLight dark:bg-head text-primary">
                {leaveEmpoyeeHead.map((header, i) => (
                  <th
                    key={i}
                    className="py-3 px-4 border-b border-gray-500"
                    scope="col"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[0.83rem]">
              {employeesOnLeaveToday.length > 0 &&
                employeesOnLeaveToday.map((leave, index) => (
                  <tr
                    key={leave._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-gray-500">
                      EMP {leave.employee?.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave?.substitute?.name || "Not Found"}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.leaveType}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {formatDate(leave.fromDate)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {formatDate(leave.toDate)}
                    </td>
                    {/* <td className="py-3 px-4 border-b border-gray-500">
                      {leave.duration} days
                    </td> */}
                    <td className="py-3 pl-8 border-b border-gray-500">
                      <button
                        onClick={() => handleSubstituteAssign(leave._id)}
                        title="Assign Substitute"
                      >
                        <i className="fa-solid fa-sliders"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && !error && employeesOnLeaveToday.length === 0 && (
            <NoDataMessage message={`No employees on leave for ${status}.`} />
          )}

          {error && <FetchError error={error} />}
        </div>

        {toggleModal && (
          <SubstituteModal
            leaveId={selectedLeave}
            onClose={() => setToggleModal(false)}
          />
        )}
      </section>
    </>
  );
}

export default EmployeeOnLeave;
