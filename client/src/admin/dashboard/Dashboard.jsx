import React from "react";
import { useSelector } from "react-redux";
import InfoCard from "../../components/shared/others/InfoCard";
import LineChart from "../../components/shared/charts/LineChart";
import PieChart from "../../components/shared/charts/Pie";
import BarGraph from "../../components/shared/charts/BarGraph";
import ComponentLoader from "../../components/shared/loaders/ComponentLoader";

const Dashboard = () => {
  const { insights, loading, error } = useSelector((state) => state.insight);

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
      id: 4,
      title: "Pending Leaves",
      stats: insights?.pendingLeaves,
      range: 30,
    },
    {
      id: 5,
      title: "Emp on Leaves Today",
      stats: insights?.employeesOnLeave,
      range: 70,
    },
    {
      id: 6,
      title: "AI Sentiment Analysis",
      stats: insights?.sentimentAnalysis === "Positive" ? "``🙂``" : "``😐``",
      range: 50,
    },
  ];

  if (loading || !insights || error) return <ComponentLoader />;

  return (
    <>
      <section className=" text-primary">
        <div className="w-full flex flex-wrap justify-between gap-2">
          {infoCardData.map((item) => (
            <InfoCard key={item.id} detail={item} />
          ))}
        </div>

        <div className="flex justify-between md:flex-row flex-col h-auto md:h-[400px] md:mb-2">
          <div className="w-full h-full mt-2 rounded-lg bg-secondary border border-primary py-4 px-1">
            <h3 className="text-base font-bold mb-7 sm:mb-10 pl-4">
              Overall Attendance Overview
            </h3>
            <div className="w-full flex justify-center">
              <LineChart />
            </div>
          </div>
        </div>

        <div className="sm:flex justify-between md:flex-row flex-col h-auto md:h-[400px] mb-2">
          <div className="md:w-[59%] block h-full w-full mt-2 rounded-lg  bg-secondary border border-primary p-4 overflow-auto">
            <h3 className="text-base font-bold mb-4">
              Attendace Overview By Department
            </h3>

            <div className="w-full pt-9 pr-6">
              <BarGraph />
            </div>
          </div>

          <div className="md:w-[40%] h-full md:mt-2 rounded-lg bg-secondary border border-primary py-4 px-1 mt-2">
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
