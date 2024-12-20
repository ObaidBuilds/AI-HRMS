import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../components/shared/Heading";
import Loader from "../../components/shared/Loader";
import { getAttendanceList, markAttendance } from "../../services/attendance";

function Attendance() {
  const dispatch = useDispatch();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { departments } = useSelector((state) => state.department);
  const { attendanceList, loading } = useSelector((state) => state.attendance);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendaceRecord, setAttendaceRecord] = useState([]);

  useEffect(() => {
    if (selectedDepartment) {
      dispatch(getAttendanceList(selectedDepartment));
    }
  }, [selectedDepartment, dispatch]);

  function handleMarkAttendance({ employee, date, status }) {
    setAttendaceRecord((prevRecord) => {
      const updatedRecord = prevRecord.filter(
        (rec) => rec.employee !== employee
      );

      return [...updatedRecord, { employee, date, status }];
    });
  }

  function handleAttendanceSubmit() {
    if (attendaceRecord.length === 0) {
      toast("No attendance records to submit!");
      return;
    }
    const confirm = window.confirm("Are you sure you want to submit");
    if(!confirm) return;
    dispatch(markAttendance(attendaceRecord));
    setAttendaceRecord([]);
  }

  return (
    <div className="w-full rounded-lg bg-gray-900">
      {loading && <Loader />}

      <Heading heading={"Attendance Management ⏰"} />

      <div className="mt-2 rounded-md flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        {/* Department Dropdown */}
        <div className="w-full h-[105px] md:w-1/4 bg-gray-800 border border-gray-700 md:border-0 md:border-b-4 p-4 rounded-md shadow-md">
          <label
            htmlFor="department"
            className="text-[0.9rem] text-gray-400 mb-2 block"
          >
            Select Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            id="department"
            className="w-full text-[0.8rem] bg-gray-900 text-gray-300 border border-gray-600 rounded-md p-2 focus:outline-none "
            required
          >
            <option value="">--Select Department--</option>
            {departments &&
              departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="w-full h-[110px] md:w-1/4 bg-gray-800 border border-gray-700 md:border-0 md:border-b-4 p-4 rounded-md shadow-md">
          <label
            htmlFor="date"
            className="text-[0.9rem] text-gray-400 mb-2 block"
          >
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full text-[0.8rem] bg-gray-900 text-gray-300 border border-gray-600 rounded-md p-2 "
          />
        </div>

        {/* Present Count */}
        <div className="w-full hidden h-[110px] md:w-1/4 bg-gray-800 border-l-4 border-green-500 p-4 rounded-md md:flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400">Present</p>
            <p className="text-xl font-semibold text-green-500">
              {attendaceRecord.length}
            </p>
          </div>
          <div className="text-indigo-500 text-3xl">
            <i className="fas fa-user-check"></i>{" "}
          </div>
        </div>

        {/* Absent Count */}
        <div className="w-full hidden h-[110px] md:w-1/4 bg-gray-800 border-l-4 border-red-500 p-4 rounded-md md:flex justify-between px-5 items-center">
          <div>
            <p className="text-sm text-gray-400">Absent</p>
            <p className="text-xl font-semibold text-red-500">
              {attendanceList.length - attendaceRecord.length}
            </p>
          </div>
          <div className="text-red-500 text-3xl">
            <i className="fas fa-user-times"></i>
          </div>
        </div>
      </div>

      <section className="bg-gray-700 mt-2 p-3 rounded-lg">
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
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {attendanceList && attendanceList.length === 0 && (
            <p className="text-center text-[0.82rem] font-semibold text-gray-300 py-[135px]">
              Select Department to get sheet
            </p>
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
      </section>
    </div>
  );
}

export default Attendance;
