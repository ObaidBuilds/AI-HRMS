import { useState } from "react";
import { Helmet } from "react-helmet";
import { checkAttendanceHead } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import FetchError from "../../components/shared/error/FetchError";
import SheetModal from "../../components/shared/modals/SheetModal";
import { getEmployeeAttendanceByDepartment } from "../../services/attendance.service";

function CheckAttendance() {
  const dispatch = useDispatch();

  const { departments } = useSelector((state) => state.department);
  const { attendanceRecord, loading, error } = useSelector(
    (state) => state.attendance
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (selectedDepartment && selectedDate) {
      dispatch(
        getEmployeeAttendanceByDepartment({ selectedDepartment, selectedDate })
      );
    }
    setShowModal(false);
  };

  return (
    <>
      <Helmet>
        <title>Check Attendance - Metro HR</title>
      </Helmet>

      {loading && <Loader />}

      <section className="bg-gray-100 border border-gray-300 dark:border-primary dark:bg-secondary p-3 min-h-screen rounded-lg shadow">
        <div id="overflow" className="overflow-x-auto mt-3">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-headLight dark:bg-head text-primary">
                {checkAttendanceHead.map((header, i) => (
                  <th key={i} className="py-3 px-4 border-b border-secondary">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceRecord.length >= 1 &&
                attendanceRecord.map((attendance) => (
                  <tr
                    key={attendance._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-gray-500">
                      EMP {attendance.employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {attendance.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {attendance.employee.department.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {attendance.employee.role.name}
                    </td>
                    <td
                      className={`py-3 px-4 border-b border-gray-500 font-semibold flex items-center gap-2 ${
                        attendance.status === "Present"
                          ? "text-green-400"
                          : attendance.status === "Absent"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {attendance.status === "Present" ? (
                        <i className="fas fa-check-circle text-green-500"></i>
                      ) : (
                        <i className="fas fa-times-circle text-red-500"></i>
                      )}
                      {attendance.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!selectedDepartment && attendanceRecord.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] sm:h-[70vh]">
              <button
                onClick={() => setShowModal(true)}
                className="p-4 rounded-md text-center text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                <i className="fas fa-building mr-2"></i>
                Select Department to see attendance
              </button>
            </div>
          )}

          {error && <FetchError error={error} />}
        </div>

        {showModal && (
          <SheetModal
            departments={departments}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onClose={() => setShowModal(false)}
            handleModalSubmit={handleModalSubmit}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
        )}
      </section>
    </>
  );
}

export default CheckAttendance;
