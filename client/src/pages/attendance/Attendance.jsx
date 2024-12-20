import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../components/shared/Heading";
import Loader from "../../components/shared/Loader";
import Modal from "../../components/shared/SheetModal";
import { getAttendanceList, markAttendance } from "../../services/attendance";

function Attendance() {
  const dispatch = useDispatch();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { departments } = useSelector((state) => state.department);
  const { attendanceList, loading } = useSelector((state) => state.attendance);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showModal, setShowModal] = useState(false);
  const [attendaceRecord, setAttendaceRecord] = useState([]);

  function handleModalSubmit(e) {
    e.preventDefault();

    if (selectedDepartment) {
      dispatch(getAttendanceList(selectedDepartment));
    }
    setShowModal(false);
  }

  function handleMarkAttendance({ employee, date, status }) {
    setAttendaceRecord((prevRecord) => {
      if (status === "Present") {
        return [
          ...prevRecord.filter((rec) => rec.employee !== employee),
          { employee, date, status },
        ];
      } else {
        return prevRecord.filter((rec) => rec.employee !== employee);
      }
    });
  }

  function handleAttendanceSubmit() {
    if (attendaceRecord.length === 0) {
      toast("No attendance records to submit!");
      return;
    }
    const confirm = window.confirm("Are you sure you want to submit");
    if (!confirm) return;
    dispatch(markAttendance(attendaceRecord));
    setAttendaceRecord([]);
  }

  return (
    <div className="w-full rounded-lg bg-gray-900">
      {loading && <Loader />}

      <Heading heading={"Attendance Management ⏰"} />

      <section className="bg-gray-700 mt-2 p-3 rounded-lg">
        <div className="flex justify-between items-center py-1 sm:py-0 sm:px-3">
          <button className="flex justify-between items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-2xl font-semibold">
            <i className="fa-solid fa-user text-[0.7rem] sm:text-xs"></i> Total
            Emp : {attendanceList.length}
          </button>

          <button className="flex justify-between items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-2xl font-semibold">
            <i className="fas fa-check-circle text-[0.7rem] sm:text-xs"></i>
            Total Present : {attendaceRecord.length}
          </button>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="min-w-full text-left table-auto border-collapse text-[0.83rem] whitespace-nowrap">
            <thead>
              <tr className="bg-gray-600 text-gray-200">
                <th className="py-3 px-4 border-b border-gray-500">Emp ID</th>
                <th className="py-3 px-4 pl-7 border-b border-gray-500 text-center">
                  Name
                </th>
                <th className="py-3 px-4 border-b border-gray-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceList &&
                attendanceList.map((employee) => (
                  <tr
                    key={employee._id}
                    className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600"
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
                          checked={attendaceRecord.some(
                            (record) =>
                              record.employee === employee._id &&
                              record.date === selectedDate &&
                              record.status === "Present"
                          )}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {attendanceList && attendanceList.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[61vh] sm:h-[69vh]">
              <button
                onClick={() => setShowModal(true)}
                className="p-4 rounded-md text-center text-[0.83rem] font-semibold text-gray-300"
              >
                <i className="fas fa-building mr-2 "></i>
                Select Department to get sheet
              </button>
            </div>
          )}

          {attendanceList.length >= 1 && (
            <button
              onClick={handleAttendanceSubmit}
              type="button"
              className="bg-blue-600 text-gray-200 p-2 mt-5 rounded-md hover:bg-blue-700 w-full"
            >
              Submit
            </button>
          )}
        </div>

        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            departments={departments}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            handleModalSubmit={handleModalSubmit}
          />
        )}
      </section>
    </div>
  );
}

export default Attendance;
