import React, { useEffect } from "react";
import InfoCard from "../../components/shared/InfoCard";
import LineChart from "../../components/shared/LineChart";
import PieChart from "../../components/shared/Pie";
import BarGraph from "../../components/shared/BarGraph";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../components/shared/Error";
import ComponentLoader from "../../components/shared/ComponentLoader";

const Dashboard = () => {
  const { insights, loading, error } = useSelector((state) => state.insight);

  const dispatch = useDispatch();

  const infoCardData = [
    {
      id: 1,
      title: "Total Employees",
      stats: insights?.totalEmployees,
      range: 70,
    },
    {
      id: 2,
      title: "Total Department",
      stats: insights?.totalDepartments,
      range: 30,
    },
    {
      id: 3,
      title: "Complaints Today",
      stats: insights?.totalComplaints,
      range: 50,
    },
    {
      id: 2,
      title: "Pending Leaves",
      stats: insights?.pendingLeaves,
      range: 30,
    },
    {
      id: 1,
      title: "Leaves Today",
      stats: insights?.employeesOnLeave,
      range: 70,
    },
    {
      id: 3,
      title: "AI Sentiment Analysis",
      stats: insights?.sentimentAnalysis === "Positive" ? "``🙂``" : "``😐``",
      range: 50,
    },
  ];

  if (loading || !insights || error) return <ComponentLoader />;

  return (
    <>
      <section>
        <div className="w-full flex flex-wrap justify-between gap-2">
          {infoCardData.map((item) => (
            <InfoCard key={item.id} detail={item} />
          ))}
        </div>

        <div className="flex justify-between md:flex-row flex-col h-auto md:h-[400px] md:mb-2">
          <div className="w-full h-full mt-2 rounded-lg bg-secondary border border-gray-600 py-4 px-1">
            <h3 className="text-base font-bold mb-7 sm:mb-10 pl-4">
              Employee Performance Overview
            </h3>
            <div className="w-full flex justify-center">
              <LineChart />
            </div>
          </div>
        </div>

        <div className="sm:flex justify-between md:flex-row flex-col h-auto md:h-[400px] mb-2 md:mb-4">
          <div className="md:w-[59%] hidden md:block h-full w-full mt-2 rounded-lg  bg-secondary border border-gray-600 p-4 overflow-auto">
            <h3 className="text-base font-bold text-gray-200 mb-4">
              Attendace Overview
            </h3>

            <div className="w-full pt-9 pr-6">
              <BarGraph />
            </div>
          </div>

          <div className="md:w-[40%] h-full md:mt-2 rounded-lg bg-secondary border border-gray-600 py-4 px-1 mt-2">
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
    </>
  );
};

export default Dashboard;
