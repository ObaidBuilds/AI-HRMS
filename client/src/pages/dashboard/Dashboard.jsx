import React, { useEffect } from "react";
import InfoCard from "../../components/shared/InfoCard";
import LineChart from "../../components/shared/LineChart";
import PieChart from "../../components/shared/Pie";
import BarGraph from "../../components/shared/BarGraph";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { totalDepartments, totalEmployees, totalRoles } = useSelector(
    (state) => state.insight.insights
  );

  const infoCardData = [
    {
      id: 1,
      title: "Total Employees",
      stats: totalEmployees,
      range: 70,
    },
    {
      id: 2,
      title: "Total Department",
      stats: totalDepartments,
      range: 30,
    },
    {
      id: 3,
      title: "Total Position",
      stats: totalRoles,
      range: 50,
    },
  ];

  return (
    <section>
      <div className="w-full flex flex-wrap justify-between gap-2 lg:gap-0">
        {infoCardData.map((item) => (
          <InfoCard key={item.id} detail={item} />
        ))}
      </div>

      <div className="flex justify-between md:flex-row flex-col h-auto md:h-[400px] md:mb-2">
        <div className="w-full h-full mt-2 rounded-lg bg-gray-700 border border-gray-600 py-4 px-1">
          <h3 className="text-base font-bold mb-7 sm:mb-10 pl-4">
            Employee Performance Overview
          </h3>
          <div className="w-full flex justify-center">
            <LineChart />
          </div>
        </div>
      </div>

      <div className="flex justify-between md:flex-row flex-col h-auto md:h-[400px] mb-3 md:mb-4">
        <div className="md:w-[59%] h-full w-full mt-2 rounded-lg  bg-gray-700 border border-gray-600 p-4 overflow-auto hidden sm:block">
          <h3 className="text-base font-bold text-gray-200 mb-4">
            Attendace Overview
          </h3>

          <div className="w-full pt-9 pr-6">
            <BarGraph />
          </div>
        </div>

        <div className="md:w-[40%] h-full md:mt-2 rounded-lg bg-gray-700 border border-gray-600 py-4 px-1 mt-2">
          <h3 className="text-base font-bold md:mb-3 pl-4">
            Employee Category
          </h3>
          <div className="w-full flex justify-center items-center">
            <div className="py-4">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
