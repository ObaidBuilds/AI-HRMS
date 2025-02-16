import React from "react";
import BarGraph from "../../components/shared/charts/BarGraph";
import PieChart from "../../components/shared/charts/Pie";
import LineChart from "../../components/shared/charts/LineChart";

const Report = () => {
  return (
    <section>
      <div className="sm:flex gap-2 justify-between md:flex-row flex-col h-auto md:h-[400px] mb-2">
        <div className="md:w-1/2 block h-full w-full mt-2 rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  p-4 overflow-auto shadow">
          <h3 className="text-base font-bold mb-4">
            Overall Attendance Overview
          </h3>
          <div className="w-full pt-9 pr-6">
            <LineChart />
          </div>
        </div>

        <div className="md:w-1/2 block h-full w-full mt-2 rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  p-4 overflow-auto shadow">
          <h3 className="text-base font-bold mb-4">
            Attendace Overview By Department
          </h3>
          <div className="w-full pt-10 pr-6">
            <BarGraph />
          </div>
        </div>
      </div>

      <div className="sm:flex gap-2 justify-between md:flex-row flex-col h-auto md:h-[400px] mb-2">
        <div className="md:w-1/2 block h-full w-full mt-2 rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  p-4 overflow-auto shadow">
          <h3 className="text-base font-bold mb-4">
            Department-wise Leave Analysis
          </h3>
          <div className="w-full pt-10 pr-6">
            <BarGraph />
          </div>
        </div>

        <div className="md:w-1/2 h-full md:mt-2 rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  py-4 px-1 mt-2 shadow">
          <h3 className="text-base font-bold md:mb-3 pl-4">
            Leave Approval - Rejection Rate
          </h3>
          <div className="w-full flex justify-center items-center">
            <div className="py-4">
              <PieChart />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:flex gap-2 justify-between md:flex-row flex-col h-auto md:h-[400px] mb-2">
        <div className="md:w-1/2 h-full md:mt-2 rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  py-4 px-1 mt-2 shadow">
          <h3 className="text-base font-bold md:mb-3 pl-4">
            Complaint Resolution Rate
          </h3>
          <div className="w-full flex justify-center items-center">
            <div className="py-4">
              <PieChart />
            </div>
          </div>
        </div>

        <div className="md:w-1/2 block h-full w-full mt-2 rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  p-4 overflow-auto shadow">
          <h3 className="text-base font-bold mb-4">
            Department-wise Complaints Analysis
          </h3>
          <div className="w-full pt-10 pr-6">
            <BarGraph />
          </div>
        </div>
      </div>
    </section>
  );
};

// Overall Attendance Overview	Doughnut Chart / Pie Chart
// Attendance Overview By Department	Bar Chart (Vertical/Horizontal)
// Leave Approval - Rejection Rate	Pie Chart / Doughnut Chart
// Department-wise Leave Analysis	Stacked Bar Chart / Grouped Bar Chart
// Complaint Resolution Rate	Pie Chart / Doughnut Chart
// Department-wise Complaints Analysis	Bar Chart (Vertical/Horizontal)

export default Report;
