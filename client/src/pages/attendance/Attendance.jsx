import React, { useState, useEffect } from "react";

const Attendance = () => {
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [monthFilter, setMonthFilter] = useState("");

  // Simulated fetch for attendance data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = [
        { date: "2024-12-01", status: "Present" },
        { date: "2024-12-02", status: "Absent" },
        { date: "2024-12-03", status: "Present" },
        { date: "2024-12-04", status: "Leave" },
        { date: "2024-12-05", status: "Present" },
        { date: "2024-12-06", status: "Absent" },
        { date: "2024-12-07", status: "Present" },
        { date: "2024-11-01", status: "Present" },
        { date: "2024-11-02", status: "Absent" },
        { date: "2024-11-03", status: "Present" },
      ];
      setAttendanceData(data);
      setFilteredData(data);
      setLoading(false);
    }, 1500);
  }, []);

  // Handle month filter
  const handleMonthFilter = (e) => {
    setMonthFilter(e.target.value);
    if (e.target.value) {
      const filtered = attendanceData.filter((item) => {
        const month = new Date(item.date).toLocaleString("default", {
          month: "long",
        });
        return month.toLowerCase() === e.target.value.toLowerCase();
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(attendanceData);
    }
  };

  // Calculate average attendance percentage
  const calculateAvgAttendance = () => {
    const presentCount = filteredData.filter(
      (item) => item.status === "Present"
    ).length;
    const totalCount = filteredData.length;
    return totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(2) : 0;
  };

  // Format date to "12 June 2003"
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <section className="h-auto flex justify-center items-center text-white">
      <div className="w-full sm:w-[95%] rounded-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            View Your Attendance
          </h1>
        </div>

        {/* Filter */}
        <div className="flex justify-between mb-4">
          <select
            className="bg-gray-700 text-sm p-3 rounded-full border border-gray-600 focus:ring-2 focus:ring-blue-500"
            value={monthFilter}
            onChange={handleMonthFilter}
          >
            <option value="">--- Filter by Month ---</option>
            <option value="December">December</option>
            <option value="November">November</option>
            {/* Add more months as needed */}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <span className="text-blue-500">Loading Attendance...</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto bg-gray-700 rounded-lg text-sm text-white">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-600">
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
                  ))}
                </tbody>
              </table>
            </div>

            {/* Average Attendance */}
            <div className="mt-6 bg-gray-700 p-4 rounded-lg text-center">
              <h2 className="text-lg font-semibold text-white">
                Average Attendance
              </h2>
              <p className="text-2xl text-blue-400">
                {calculateAvgAttendance()}%
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Attendance;
