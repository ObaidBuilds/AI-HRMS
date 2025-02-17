import React from "react";
import BarGraph from "../../components/shared/charts/BarGraph";
import PieChart from "../../components/shared/charts/Pie";
import LineChart from "../../components/shared/charts/LineChart";
import { useSelector } from "react-redux";

const Report = () => {
  const {
    leaveRejectionRate,
    leaveApprovalRate,
    complaintResolutionRate,
    complaintCloseRate,
  } = useSelector((state) => state.insight.insights);

  const reports = [
    {
      title: "Attendance Report",
      icon: "fas fa-clipboard-list",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    {
      title: "Recruitment Report",
      icon: "fas fa-user-plus",
      gradient: "bg-gradient-to-r from-green-500 to-green-700",
    },
    {
      title: "Leave Report",
      icon: "fas fa-plane-departure",
      gradient: "bg-gradient-to-r from-yellow-500 to-yellow-700",
    },
    {
      title: "Performance Report",
      icon: "fas fa-chart-line",
      gradient: "bg-gradient-to-r from-purple-500 to-purple-700",
    },
  ];

  return (
    <section className="pt-1 pb-3">
      <div className="w-full flex flex-wrap gap-2 bg-white p-3 rounded-lg">
        {reports.map((report, index) => (
          <div
            key={index}
            className={`w-[97%] md:w-[24%] ${report.gradient}  text-white rounded-2xl  p-5 flex flex-col items-center gap-3 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300`}
          >
            <i className={`${report.icon} text-xl`}></i>
            <h2 className="text-sm font-bold">{report.title}</h2>
          </div>
        ))}
      </div>
      <div className="sm:flex gap-1 justify-between md:flex-row flex-col h-auto md:h-[400px] mb-1">
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
          <div className="w-full pt-5 sm:pt-16 pr-6">
            <BarGraph />
          </div>
        </div>
      </div>

      <div className="sm:flex gap-1 justify-between md:flex-row flex-col h-auto md:h-[400px] mb-1">
        <div className="md:w-1/2 block h-full w-full mt-2 rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  p-4 overflow-auto shadow">
          <h3 className="text-base font-bold mb-4">
            Department wise Leave Analysis
          </h3>
          <div className="w-full pt-5 sm:pt-16 pr-6">
            <BarGraph />
          </div>
        </div>

        <div className="md:w-1/2 h-full md:mt-2 rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  py-4 px-1 mt-2 shadow">
          <h3 className="text-base font-bold md:mb-3 pl-4">
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
      </div>

      <div className="sm:flex gap-1 justify-between md:flex-row flex-col h-auto md:h-[400px] mb-1">
        <div className="md:w-1/2 h-full md:mt-2 rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  py-4 px-1 mt-2 shadow">
          <h3 className="text-base font-bold md:mb-3 pl-4">
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

        <div className="md:w-1/2 block h-full w-full mt-2 rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  p-4 overflow-auto shadow">
          <h3 className="text-base font-bold mb-4">
            Department-wise Complaints Analysis
          </h3>
          <div className="w-full pt-5 sm:pt-16 pr-6">
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
