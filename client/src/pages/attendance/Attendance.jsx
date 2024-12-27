import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeAttendance } from "../../services/attendance";
import { formatDate } from "../../utils";
import Loader from "../../components/shared/loaders/Loader";

const Attendance = () => {
  const dispatch = useDispatch();
  const attendance = useSelector((state) => state.attendance);

  useEffect(() => {
    dispatch(getEmployeeAttendance());
  }, [dispatch]);

  if (attendance.loading) return <Loader />;

  return (
    <section className="h-[130vh] flex justify-center items-center text-white">
      <div className="w-full sm:w-[95%] rounded-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            View Your Attendance
          </h1>
        </div>
        <div id="overflow" className="overflow-auto min-h-[60vh]">
          <table className="w-full table-auto bg-gray-700 rounded-lg text-sm text-white ">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance?.attendanceList?.attendanceRecord?.length > 0 ? (
                attendance.attendanceList.attendanceRecord.map((item) => (
                  <tr key={item._id} className="border-b border-gray-600">
                    <td className="py-2 px-4">{formatDate(item.date)}</td>
                    <td
                      className={`py-2 px-4 ${
                        item.status === "Present"
                          ? "text-green-400"
                          : item.status === "Absent"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="py-4 px-4 text-sm text-center text-gray-400"
                  >
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Average Attendance */}
        <div className="mt-6 bg-gray-700 p-7 rounded-lg text-center">
          <h2 className="text-lg font-semibold text-white">
            Average Attendance
          </h2>
          <p className="text-2xl text-blue-400 mt-3">
            {attendance?.attendanceList?.attendancePercentage || "0.00"} %
          </p>
        </div>
      </div>
    </section>
  );
};

export default Attendance;
