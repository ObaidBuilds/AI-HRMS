import { useEffect, useState } from "react";
import { getEmployeesOnLeave } from "../../services/leave.service";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../utils";
import Loader from "../../components/shared/loaders/Loader";

function EmployeeOnLeave() {
  const dispatch = useDispatch();

  const { employeesOnLeaveToday = [], loading } = useSelector(
    (state) => state.leave
  );
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    const dateMapping = {
      yesterday: new Date(new Date().setDate(new Date().getDate() - 1)),
      present: new Date(),
      tomorrow: new Date(new Date().setDate(new Date().getDate() + 1)),
    };

    dispatch(getEmployeesOnLeave(formatDate(dateMapping[status])));
  }, [status, dispatch]);

  const buttons = [
    { value: "Yesterday", icon: "fa-arrow-left" },
    { value: "Present", icon: "fa-calendar-check" },
    { value: "Tomorrow", icon: "fa-arrow-right" },
  ];

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {buttons.map((button) => (
            <button
              key={button.value}
              onClick={() => setStatus(button.value)}
              className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.8rem] border py-1 px-5 rounded-3xl font-semibold ${
                status === button.value
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <i className={`text-xs fas ${button.icon}`}></i>
              {button.value}
            </button>
          ))}
        </div>
        <div id="overflow" className="overflow-x-auto">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-head text-primary">
                {[
                  "Emp ID",
                  "Name",
                  "Department",
                  "Position",
                  "Substitute",
                  "Leave Type",
                  "From",
                  "To",
                  "Duration",
                ].map((header, i) => (
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
              {employeesOnLeaveToday &&
                employeesOnLeaveToday.map((leave, index) => (
                  <tr
                    key={index}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-gray-500">
                      EMP {leave.employee?.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.department.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.role.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.substitute.name}
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
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.duration} days
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!loading && employeesOnLeaveToday.length === 0 && (
            <div className="w-full h-[78vh] flex flex-col justify-center items-center">
              <i className="fas fa-ban text-2xl text-gray-400"></i>
              <p className="mt-2 text-sm text-gray-400">
                No employees on leave for {status}.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default EmployeeOnLeave;
