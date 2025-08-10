import React, { useEffect } from "react";
import LineChart from "../../components/shared/charts/LineChart";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeInsights } from "../../services/insights.service";
import FetchError from "../../components/shared/error/FetchError";
import ComponentLoader from "../../components/shared/loaders/ComponentLoader";

const Home = () => {
  const dispatch = useDispatch();
  const { employeeInsights, loading, error } = useSelector(
    (state) => state.insight
  );

  const attendanceByMonth = employeeInsights?.attendance?.map((item) => {
    return item.attendancePercentage;
  });

  const employeeInsightsData = [
    {
      title: "Leaves Taken",
      value: employeeInsights?.leavesTaken,
      icon: "fas fa-clipboard-list",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    {
      title: "Leave Balance",
      value: employeeInsights?.leaveBalance,
      icon: "fas fa-user-plus",
      gradient: "bg-gradient-to-r from-green-500 to-green-700",
    },
    {
      title: "Feedbacks",
      value: employeeInsights?.feedbackSubmitted,
      icon: "fas fa-comment-alt",
      gradient: "bg-gradient-to-r from-purple-500 to-purple-700",
    },
    {
      title: "KPI Score",
      value: `${employeeInsights?.performance?.kpiScore}%`,
      icon: "fas fa-star",
      gradient: "bg-gradient-to-r from-yellow-500 to-yellow-700",
    },
    {
      title: "Complaintss",
      value: employeeInsights?.complaintResolved,
      icon: "fas fa-check-circle",
      gradient: "bg-gradient-to-r from-red-500 to-red-700",
    },
    {
      title: "Attendance",
      value: `${employeeInsights?.performance?.kpis?.attendance}%`,
      icon: "fas fa-calendar-check",
      gradient: "bg-gradient-to-r from-indigo-500 to-indigo-700",
    },
  ];

  useEffect(() => {
    dispatch(getEmployeeInsights());
  }, []);

  if (error) return <FetchError error={error} />;
  if (loading || !employeeInsights) return <ComponentLoader />;

  return (
    <section className="py-1 px-1 sm:px-0 bg-gray-200">
      <div className="w-full flex flex-wrap gap-2 bg-gray-50 dark:bg-secondary p-3 rounded-lg">
        {employeeInsightsData.map((report, index) => (
          <div
            key={index}
            className={`${report.gradient} w-[99%] sm:w-[48.9%] md:w-[32.5%] text-white rounded-xl py-5 p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base sm:text-[0.93rem] font-semibold">{report.title}</p>
                <p className="text-2xl font-bold mt-3">{report.value}</p>
              </div>
              <div className="p-2 rounded-full bg-white bg-opacity-20">
                <i className={`${report.icon} text-lg`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 sm:gap-1 justify-between md:flex-row flex-col h-auto md:h-[400px] mt-2">
        <div
          id="overflow"
          className="w-full block h-full rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary p-4 overflow-auto"
        >
          <h3 className="text-[0.93rem] font-semibold mb-4 border-b dark:border-gray-600 pb-2">
            Overall Attendance Overview
          </h3>
          <div className="w-full pt-5 pr-6">
            <LineChart
              label="Attendance Percentage"
              title="Monthly Attendance Percentage"
              chartData={attendanceByMonth}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
