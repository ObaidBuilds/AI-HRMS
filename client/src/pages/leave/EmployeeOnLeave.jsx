import { useEffect, useState } from "react";
import Heading from "../../components/shared/Heading";
import { getEmployeesOnLeave } from "../../services/leave";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../utils";
import Loader from "../../components/shared/Loader";

function EmployeeOnLeave() {
  const dispatch = useDispatch();

  const { employeesOnLeaveToday, loading } = useSelector(
    (state) => state.leave
  );
  const [status, setStatus] = useState("present");

  useEffect(() => {
    const today = new Date();
    let newDate = new Date(today);

    if (status === "yesterday") {
      newDate.setDate(today.getDate() - 1);
    } else if (status === "tommorow") {
      newDate.setDate(today.getDate() + 1);
    }

    dispatch(getEmployeesOnLeave(formatDate(newDate)));
  }, [status]);

  return (
    <div className="w-full rounded-lg bg-gray-900">
      {loading && <Loader />}
      <Heading heading={"Employees on Leave 🏖️"} />

      <section className="bg-gray-700 mt-2 p-3 sm:p-4 rounded-lg min-h-[95vh]">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setStatus("yesterday")}
            className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
              status === "yesterday"
                ? "border-blue-500 ring-1 ring-blue-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
          >
            <i class="text-xs fas fa-arrow-left"></i>
            Yesterday
          </button>
          <button
            onClick={() => setStatus("present")}
            className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
              status === "present"
                ? "border-blue-500 ring-1 ring-blue-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
          >
            <i class="text-xs fas fa-calendar-check"></i>
            Present day
          </button>
          <button
            onClick={() => setStatus("tommorow")}
            className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
              status === "tommorow"
                ? "border-blue-500 ring-1 ring-blue-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
          >
            <i class="text-xs fas fa-arrow-right"></i>
            Tommorow
          </button>
        </div>
        <div id="overflow" className="overflow-x-auto">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-gray-600 text-gray-200">
                <th className="py-3 px-4 border-b border-gray-500">Emp ID</th>
                <th className="py-3 px-4 border-b border-gray-500">Name</th>
                <th className="py-3 px-4 border-b border-gray-500">
                  Department
                </th>
                <th className="py-3 px-4 border-b border-gray-500">Position</th>
                <th className="py-3 px-4 border-b border-gray-500">
                  Substitute
                </th>
                <th className="py-3 px-4 border-b border-gray-500">
                  Leave Type
                </th>
                <th className="py-3 px-4 border-b border-gray-500">From</th>
                <th className="py-3 px-4 border-b border-gray-500">To</th>
                <th className="py-3 px-4 border-b border-gray-500">Duration</th>
              </tr>
            </thead>
            <tbody className="text-[0.83rem]">
              {employeesOnLeaveToday &&
                employeesOnLeaveToday.map((leave, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-gray-500">
                      EMP {leave.employee.employeeId}
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
            <div className="w-full h-[50vh] flex flex-col justify-center items-center">
              <i className="fas fa-ban text-3xl text-gray-400"></i>
              <p className="mt-2 text-base  text-gray-400">
                No Leave Found on {status}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default EmployeeOnLeave;
