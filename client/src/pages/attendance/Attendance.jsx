import { Helmet } from "react-helmet";
import { formatDate } from "../../utils";
import React, { useEffect, useState } from "react";
import { checkAttendanceHead } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import { getEmployeeAttendance } from "../../services/attendance.service";

const Attendance = () => {
  const dispatch = useDispatch();

  const attendance = useSelector((state) => state.attendance);

  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const attendancePercentage = useSelector(
    (state) => state.insight.employeeInsights.attendancePercentage
  );

  useEffect(() => {
    dispatch(getEmployeeAttendance());
  }, [dispatch]);

  useEffect(() => {
    if (attendance?.attendanceList?.attendanceRecord) {
      setFilteredAttendance([...attendance.attendanceList.attendanceRecord]);
    }
  }, [attendance]);

  return (
    <>
      <Helmet>
        <title>Attendance - Metro HR</title>
      </Helmet>

      {attendance.loading && <Loader />}

      <section className="bg-gray-100 border border-gray-300 dark:border-primary dark:bg-secondary p-3 h-[90vh] sm:min-h-screen rounded-lg shadow">
        <div className="flex justify-center items-center text-white">
          <div className="w-full rounded-2xl p-2">
            <div
              id="overflow"
              className="overflow-auto bg-gray-100 shadow h-[71vh] mt-2"
            >
              <table className="min-w-full table-auto text-sm text-white whitespace-nowrap">
                <thead>
                  <tr className="bg-headLight sticky top-0 text-gray-200 text-left">
                    {checkAttendanceHead.map((header, i) => (
                      <th
                        key={i}
                        className="py-3 px-4 border-b border-gray-500"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance &&
                    filteredAttendance.map((item) => (
                      <tr
                        key={item._id}
                        className="even:bg-gray-100 text-gray-700 odd:bg-gray-200 hover:bg-gray-300"
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

            <div className="mt-2 bg-headLight border border-gray-200 p-7 rounded-lg text-center text-gray-200">
              <h2 className="text-lg font-semibold">Average Percentage</h2>
              <p className="text-2xl font-bold mt-3">
                {attendancePercentage || "--"} %
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Attendance;
