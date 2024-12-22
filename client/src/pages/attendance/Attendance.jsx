import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../components/shared/Heading";
import SheetModal from "../../components/shared/SheetModal";
import Modal from "../../components/shared/Modal";
import { getAttendanceList, markAttendance } from "../../services/attendance";
import ComponentLoader from "../../components/shared/ComponentLoader";

function Attendance() {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.department);
  const { attendanceList, loading } = useSelector((state) => state.attendance);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showModal, setShowModal] = useState(false);
  const [showConfimModal, setShowConfimModal] = useState(false);
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

  function isConfirm() {
    handleAttendanceSubmit();
    setShowConfimModal(false);
  }

  function handleAttendanceSubmit() {
    if (attendaceRecord.length === 0) {
      toast("No attendance records to submit!");
      return;
    }

    dispatch(markAttendance(attendaceRecord));
    setAttendaceRecord([]);
  }

  if (loading) return <ComponentLoader />;

  return (
    <div className="w-full rounded-lg">
      <Heading heading={"Attendance Management ⏰"} />

      <section className="bg-secondary mt-2 p-3 rounded-lg">
        <div className="flex gap-2 flex-wrap justify-between items-center py-1 sm:px-3">
          <button className="hidden sm:flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-2 px-5 rounded-3xl font-semibold">
            Total Employees : {attendanceList.length}
          </button>

          {attendanceList.length >= 1 && (
            <button className="hidden sm:flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-2 px-5 rounded-3xl font-semibold">
              Total Present : {attendaceRecord.length}
            </button>
          )}

          {!attendanceList.length && (
            <button
              onClick={() => setShowModal(true)}
              className="flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-2 px-5 rounded-3xl font-semibold"
            >
              Select Department
            </button>
          )}
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
              onClick={() => setShowConfimModal(true)}
              type="button"
              className="bg-blue-600 mb-4 text-gray-200 p-3 mt-5 rounded-3xl hover:bg-blue-700 w-full"
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
        {showConfimModal && (
          <Modal
            onClose={() => setShowConfimModal(false)}
            action={"submit"}
            isConfirm={isConfirm}
          />
        )}
      </section>
    </div>
  );
}

export default Attendance;
