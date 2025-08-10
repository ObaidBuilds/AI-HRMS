import React from "react";
import LineChart from "../../components/shared/charts/LineChart";
import { useSelector } from "react-redux";
import FetchError from "../../components/shared/error/FetchError";
import ComponentLoader from "../../components/shared/loaders/ComponentLoader";
import InfoCard from "../../components/shared/cards/InfoCard";

const Home = () => {
  const { employeeInsights, loading, error } = useSelector(
    (state) => state.insight
  );

  const attendanceByMonth = employeeInsights?.attendanceRecord?.map((item) => {
    return item.attendancePercentage;
  });

  const employeeInsightsData = [
    {
      title: "Leaves Taken",
      stats: employeeInsights?.leavesTaken,
    },
    {
      title: "Leave Balance",
      stats: employeeInsights?.leaveBalance,
    },
    {
      title: "Feedbacks",
      stats: employeeInsights?.feedbackSubmitted,
    },
    {
      title: "Complaintss",
      stats: employeeInsights?.complaintResolved,
    },
    {
      title: "KPI Score",
      stats: `${employeeInsights?.kpiScore}%`,
    },
    {
      title: "Attendance",
      stats: `${employeeInsights?.attendancePercentage}%`,
    },
  ];

  if (error) return <FetchError error={error} />;
  if (loading || !employeeInsights) return <ComponentLoader />;

  return (
    <section className="px-1 sm:px-0 bg-gray-200">
      <div className="w-full flex flex-wrap gap-2 dark:bg-secondary rounded-lg">
        {employeeInsightsData.map((report, index) => (
          <InfoCard detail={report} key={index} />
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
