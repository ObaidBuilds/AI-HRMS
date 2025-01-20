import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeAttendance } from "../../services/attendance";
import { formatDate } from "../../utils";
import Loader from "../../components/shared/loaders/Loader";

const Attendance = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.attendance);

  const [sortOrder, setSortOrder] = useState("");
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  useEffect(() => {
    dispatch(getEmployeeAttendance());
  }, [dispatch]);

  useEffect(() => {
    if (attendance?.attendanceList?.attendanceRecord) {
      let records = [...attendance.attendanceList.attendanceRecord];

      if (sortOrder) {
        records.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.date > b.date ? 1 : -1;
          } else if (sortOrder === "desc") {
            return a.date < b.date ? 1 : -1;
          }
          return 0;
        });
      }

      setFilteredAttendance(records);
    }
  }, [attendance, sortOrder]);

  const calculateAttendancePercentage = () => {
    const total = filteredAttendance.length;
    const present = filteredAttendance.filter(
      (item) => item.status === "Present"
    ).length;
    return total === 0 ? 0 : ((present / total) * 100).toFixed(2);
  };

  return (
    <>
      {attendance.loading && <Loader />}
      <section className="py-3 flex justify-center items-center text-white">
        <div className="w-full sm:w-[95%] rounded-2xl p-3 sm:p-8">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              View Your Attendance
            </h1>
          </div>
          <div>
            <div className="relative mb-2">
              <select
                id="select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full bg-gray-700 text-center text-sm p-3 sm:p-4 rounded-full border border-gray-600 pl-12 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">--- Sort Attendance ---</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
          <div
            id="overflow"
            className="overflow-auto bg-secondary rounded-lg shadow-lg sm:h-[65vh]"
          >
            <table className="min-w-full table-auto text-sm text-white whitespace-nowrap">
              <thead>
                <tr className="bg-gray-600 text-gray-200 text-left">
                  {[
                    "Emp ID",
                    "Name",
                    "Department",
                    "Position",
                    "Date",
                    "Status",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="py-3 px-4 border-b border-gray-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAttendance &&
                  filteredAttendance.map((item, index) => (
                    <tr
                      key={item._id}
                      className="even:bg-gray-100 text-gray-700 odd:bg-gray-200  hover:bg-gray-300"
                    >
                      <td className="py-3 px-4 border-b border-gray-500">
                        EMP {item.employee.employeeId}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {item.employee.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {item.employee.department.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {item.employee.role.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {formatDate(item.date)}
                      </td>
                      <td
                        className={`py-3 px-4 border-b border-gray-500 font-semibold flex items-center gap-2 ${
                          item.status === "Present"
                            ? "text-green-400"
                            : item.status === "Absent"
                            ? "text-red-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {item.status === "Present" ? (
                          <i className="fas fa-check-circle text-green-500"></i>
                        ) : (
                          <i className="fas fa-times-circle text-red-500"></i>
                        )}
                        {item.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {!attendance.loading && filteredAttendance.length === 0 && (
              <div className="w-full h-[60vh] flex flex-col justify-center items-center">
                <i className="fas fa-ban text-2xl text-gray-400"></i>
                <p className="mt-2 text-sm text-gray-400">
                  No record available
                </p>
              </div>
            )}
          </div>

          <div className="mt-2 bg-gray-700 p-7 rounded-lg text-center">
            <h2 className="text-lg font-semibold text-white">
              Average Percentage
            </h2>
            <p className="text-2xl font-bold mt-3">
              {calculateAttendancePercentage()} %
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Attendance;
