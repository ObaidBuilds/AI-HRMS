import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import SheetModal from "../../components/shared/modals/SheetModal";
import Modal from "../../components/shared/modals/Modal";
import Loader from "../../components/shared/loaders/Loader";
import {
  getAttendanceList,
  markAttendance,
} from "../../services/attendance.service";

function Attendance() {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.department);
  const { attendanceList, loading } = useSelector((state) => state.attendance);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [attendanceRecord, setAttendanceRecord] = useState([]);

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (selectedDepartment && selectedDate) {
      dispatch(getAttendanceList({ selectedDepartment, selectedDate }));
    }
    setShowModal(false);
  };

  const handleMarkAttendance = ({ employee, date, status }) => {
    const existingRecord = attendanceRecord.find(
      (rec) => rec.employee === employee && rec.date === date
    );

    if (existingRecord) {
      if (status === "Absent") {
        setAttendanceRecord((prev) =>
          prev.filter(
            (rec) => !(rec.employee === employee && rec.date === date)
          )
        );
      }
    } else {
      if (status === "Present") {
        setAttendanceRecord((prev) => [...prev, { employee, date, status }]);
      }
    }
  };

  const handleAttendanceSubmit = () => {
    if (attendanceRecord.length === 0) {
      toast("No attendance records to submit!");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0];
    if (selectedDate > currentDate) {
      toast.error("Selected date cannot be greater than the current date.");
      return;
    }

    dispatch(markAttendance(attendanceRecord));
    setAttendanceRecord([]);
    setSelectedDepartment("");
  };

  const confirmAttendanceSubmit = () => {
    handleAttendanceSubmit();
    setShowConfirmModal(false);
  };

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 border border-gray-300 dark:border-primary dark:bg-secondary p-3 min-h-screen rounded-lg shadow">
        <div className="flex gap-2 flex-wrap justify-between items-center py-1 sm:px-3">
          <button className="hidden sm:flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-sm border py-1 px-5 rounded-3xl font-semibold">
            Total Employees: {attendanceList.length}
          </button>

          {attendanceList.length > 0 && (
            <button className="hidden sm:flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-sm border py-1 px-5 rounded-3xl font-semibold">
              Total Present: {attendanceRecord.length}
            </button>
          )}

          {!attendanceList.length && (
            <button
              onClick={() => setShowModal(true)}
              className="flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-sm border py-1 px-5 rounded-3xl font-semibold"
            >
              Select Department
            </button>
          )}
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-headLight dark:bg-head text-primary">
                <th className="py-3 px-4 border-b border-gray-500">Emp ID</th>
                <th className="py-3 px-4 border-b border-gray-500 text-center">
                  Name
                </th>
                <th className="py-3 px-4 border-b border-gray-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.length >= 1 &&
                attendanceList.map((employee) => (
                  <tr
                    key={employee._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-gray-500">
                      EMP {employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500 text-center">
                      {employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500 text-right">
                      <label className="switch">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleMarkAttendance({
                              employee: employee._id,
                              date: selectedDate,
                              status: e.target.checked ? "Present" : "Absent",
                            })
                          }
                          checked={attendanceRecord.some(
                            (rec) =>
                              rec.employee === employee._id &&
                              rec.date === selectedDate &&
                              rec.status === "Present"
                          )}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {attendanceList.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] sm:h-[70vh]">
              {!selectedDepartment ? (
                <button
                  onClick={() => setShowModal(true)}
                  className="p-4 rounded-md text-center text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  <i className="fas fa-building mr-2"></i>
                  Select Department to get sheet
                </button>
              ) : (
                <button className="p-4 rounded-md text-center text-sm font-semibold text-gray-300">
                  <i className="fas fa-building mr-2"></i>
                  No Employee in this department
                </button>
              )}
            </div>
          )}

          {attendanceList.length > 0 && (
            <button
              onClick={() => setShowConfirmModal(true)}
              disabled={loading}
              className="bg-blue-600 mb-4 text-primary p-4 font-semibold mt-5 rounded-full hover:bg-blue-700 w-full"
            >
              Submit
            </button>
          )}
        </div>

        {showModal && (
          <SheetModal
            onClose={() => setShowModal(false)}
            departments={departments}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            handleModalSubmit={handleModalSubmit}
          />
        )}

        {showConfirmModal && (
          <Modal
            onClose={() => setShowConfirmModal(false)}
            action="submit"
            isConfirm={confirmAttendanceSubmit}
          />
        )}
      </section>
    </>
  );
}

export default Attendance;
