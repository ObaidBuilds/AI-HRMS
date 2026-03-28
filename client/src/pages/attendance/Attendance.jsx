import { Helmet } from "react-helmet";
import { formatDate } from "../../utils";
import { useEffect, useState } from "react";
import { checkAttendanceHead } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import { getEmployeeAttendance } from "../../services/attendance.service";
import Pagination from "../../components/shared/others/Pagination";
import NoDataMessage from "../../components/shared/error/NoDataMessage";

const Attendance = () => {
  const dispatch = useDispatch();

  const { attendanceList, loading, fetch } = useSelector(
    (state) => state.attendance,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  const attendancePercentage = attendanceList?.attendancePercentage;

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getEmployeeAttendance({ page: currentPage, limit: 12 }));
  }, [dispatch, currentPage, fetch]);

  useEffect(() => {
    if (attendanceList?.attendanceRecord) {
      setFilteredAttendance([...attendanceList.attendanceRecord]);
    }
  }, [attendanceList]);

  return (
    <>
      <Helmet>
        <title>Attendance - Metro HR</title>
      </Helmet>

      {loading && <Loader />}

      <section className="bg-gray-100 border border-gray-300 dark:border-primary dark:bg-secondary p-3 min-h-[90vh] sm:min-h-screen rounded-lg shadow flex flex-col">
        <div className="w-full rounded-2xl p-2 flex-grow">
          <div
            id="overflow"
            className="overflow-auto bg-gray-100 shadow h-[65vh] mt-2 rounded-md"
          >
            <table className="min-w-full table-auto text-sm text-white whitespace-nowrap">
              <thead>
                <tr className="bg-headLight sticky top-0 text-gray-200 text-left z-10">
                  {checkAttendanceHead.map((header, i) => (
                    <th key={i} className="py-3 px-4 border-b border-gray-500">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.length > 0 &&
                  filteredAttendance.map((item) => (
                    <tr
                      key={item._id}
                      className="even:bg-gray-100 text-gray-700 odd:bg-gray-200 hover:bg-gray-300"
                    >
                      <td className="py-3 px-4 border-b border-gray-500">
                        EMP {item.employee?.employeeId}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {item.employee?.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {item.employee?.department?.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {item.employee?.role?.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {formatDate(item.date)}
                      </td>
                      <td
                        className={`py-3 px-4 border-b border-gray-500 font-semibold flex items-center gap-2 ${
                          item.status === "Present"
                            ? "text-green-600"
                            : item.status === "Absent"
                              ? "text-red-600"
                              : "text-yellow-600"
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

            {!loading && filteredAttendance.length === 0 && (
              <NoDataMessage message="No attendance records found" />
            )}
          </div>

          {filteredAttendance.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={attendanceList?.pagination?.totalPages || 1}
              onPageChange={goToPage}
            />
          )}

          <div className="mt-4 bg-headLight border border-gray-200 p-4 rounded-lg text-center text-gray-200 shadow-sm">
            <h2 className="text-md font-semibold uppercase tracking-wider">
              Overall Attendance Percentage
            </h2>
            <p className="text-3xl font-black mt-2 text-white">
              {attendancePercentage ? `${attendancePercentage}%` : "--"}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Attendance;
