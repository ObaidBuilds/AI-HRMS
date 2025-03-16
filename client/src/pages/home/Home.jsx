import React from "react";
import { employeeInsights } from "../../data";
import PieChart from "../../components/shared/charts/Pie";
import LineChart from "../../components/shared/charts/LineChart";

const Home = () => {
  return (
    <section className="py-1 px-1 sm:px-0 bg-gray-200">
      <div className="w-full flex flex-wrap gap-2 bg-gray-50 dark:bg-secondary p-3 rounded-lg">
        {employeeInsights.map((report, index) => (
          <div
            key={index}
            className={`w-full md:w-[32.8%] ${report.gradient}  text-white rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300`}
          >
            <i className={`${report.icon} text-xl`}></i>
            <h2 className="text-sm font-extrabold">{report.title}</h2>
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
              chartData={[10, 20, 40, 20, 60, 30, 10, 30]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
