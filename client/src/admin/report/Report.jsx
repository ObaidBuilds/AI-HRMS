import React from "react";
import BarGraph from "../../components/shared/charts/BarGraph";
import PieChart from "../../components/shared/charts/Pie";
import LineChart from "../../components/shared/charts/LineChart";
import { useSelector } from "react-redux";
import { reports } from "../../data";

const Report = () => {
  const {
    leaveRejectionRate,
    leaveApprovalRate,
    complaintResolutionRate,
    complaintCloseRate,
  } = useSelector((state) => state.insight.insights);

  return (
    <section className="py-1">
      <div className="w-full flex flex-wrap gap-2 bg-gray-50 dark:bg-secondary p-3 rounded-lg">
        {reports.map((report, index) => (
          <div
            key={index}
            className={`w-full md:w-[24%] ${report.gradient}  text-white rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300`}
          >
            <i className={`${report.icon} text-xl`}></i>
            <h2 className="text-sm font-extrabold">{report.title}</h2>
          </div>
        ))}
      </div>

      <div className="sm:flex gap-1 justify-between md:flex-row flex-col h-auto md:h-[400px] mt-2">
        <div
          id="overflow"
          className="md:w-1/2 block h-full w-full rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  p-4 overflow-auto "
        >
          <h3 className="text-[0.93rem] font-extrabold mb-4 border-b pb-2">
            Overall Attendance Overview
          </h3>
          <div className="w-full pt-9 pr-6">
            <LineChart />
          </div>
        </div>

        <div className="md:w-1/2 h-full rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  py-4 px-1 ">
          <h3 className="text-[0.93rem] font-extrabold md:mb-3 pl-4 border-b pb-2">
            Complaint Resolution Rate
          </h3>
          <div className="w-full flex justify-center items-center">
            <div className="py-4">
              <PieChart
                labels={{
                  category1: "Resolved",
                  category2: "Closed",
                }}
                label="Complaint Handling Efficiency (%)"
                title="Employee Complaint Resolution Summary"
                data1={complaintResolutionRate}
                data2={complaintCloseRate}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:flex gap-1 justify-between md:flex-row flex-col h-auto md:h-[400px] mb-2">
        <div className="md:w-1/2 h-full md:mt-2 rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  py-4 px-1 mt-2 ">
          <h3 className="text-[0.93rem] font-extrabold md:mb-3 pl-4 border-b pb-2">
            Leave Approval Rejection Rate
          </h3>
          <div className="w-full flex justify-center items-center">
            <div className="py-4">
              <PieChart
                labels={{
                  category1: "Approved",
                  category2: "Rejected",
                }}
                label="Leave Approval vs Rejection (%)"
                title="Leave Request Analysis"
                data1={leaveApprovalRate}
                data2={leaveRejectionRate}
              />
            </div>
          </div>
        </div>

        <div className="md:w-1/2 block h-full w-full mt-2 rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  p-4 overflow-auto ">
          <h3 className="text-[0.93rem] font-extrabold mb-4 border-b pb-2">
            Attendace Overview By Department
          </h3>
          <div className="w-full pt-5 sm:pt-16 pr-6">
            <BarGraph />
          </div>
        </div>
      </div>

      <div className="flex gap-1 justify-between md:flex-row flex-col h-auto md:h-[400px] md:mb-2 ">
        <div className="md:w-1/2 block h-full w-full mt-2 rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  p-4 overflow-auto ">
          <h3 className="text-[0.93rem] font-extrabold mb-4 border-b pb-2">
            Performance Overview By Department
          </h3>
          <div className="w-full pt-5 sm:pt-16 pr-6">
            <BarGraph />
          </div>
        </div>

        <div className="md:w-1/2 h-full mt-2 rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary py-4 px-1">
          <h3 className="text-[0.93rem] font-extrabold mb-7 sm:mb-10 pl-4 border-b pb-2">
            Employee Performance Overview
          </h3>
          <div className="w-full flex justify-center">
            <LineChart />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Report;
