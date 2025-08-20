import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import PieChart from "../../components/shared/charts/Pie";
import InfoCard from "../../components/shared/cards/InfoCard";
import BarGraph from "../../components/shared/charts/BarGraph";
import LineChart from "../../components/shared/charts/LineChart";
import ChatPanel from "../../components/shared/others/ChatPanel";
import FetchError from "../../components/shared/error/FetchError";
import ComponentLoader from "../../components/shared/loaders/ComponentLoader";

const Dashboard = () => {
  const { insights, loading, error } = useSelector((state) => state.insight);

  const infoCardData = [
    { id: 1, title: "Total Employees", stats: insights?.totalEmployees },
    { id: 2, title: "Job Applications", stats: insights?.jobApplications },
    { id: 3, title: "Pending Complaints", stats: insights?.totalComplaints },
    { id: 4, title: "Pending Leaves", stats: insights?.pendingLeaves },
    { id: 5, title: "Emp on Leaves Today", stats: insights?.employeesOnLeave },
    {
      id: 6,
      title: "Average Rating",
      stats: insights?.feedbackResult[0].avgRating.toFixed(2),
    },
  ];

  const malePercentage = insights?.totalEmployees
    ? ((insights?.totalMaleEmployees / insights?.totalEmployees) * 100).toFixed(
        0
      )
    : 0;

  const femalePercentage = insights?.totalEmployees
    ? (
        (insights?.totalFemaleEmployees / insights?.totalEmployees) *
        100
      ).toFixed(0)
    : 0;

  const departments = insights?.departmentAttandancePercent?.map(
    (department) => {
      return department._id;
    }
  );

  const departmentAttendancePercentage =
    insights?.departmentAttandancePercent?.map((department) => {
      return parseInt(department.attendancePercentage);
    });

  const attendancePercentage = insights?.overallAttendancePercentage?.map(
    (item) => item.attendancePercentage
  );

  if (error) return <FetchError error={error} />;
  if (loading || !insights) return <ComponentLoader />;

  return (
    <>
      <Helmet>
        <title>Dashboard - Metro HR</title>
      </Helmet>

      <section className=" text-primary px-1 sm:px-0">
        <ChatPanel />

        <div className="w-full flex flex-wrap justify-between gap-2">
          {infoCardData.map((item) => (
            <InfoCard key={item.id} detail={item} />
          ))}
        </div>

        <div className="flex justify-between md:flex-row flex-col h-auto md:h-[400px] md:mb-2 shadow">
          <div
            id="overflow"
            className="w-full h-full mt-2 rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary py-4 px-1"
          >
            <h3 className="text-[0.93rem] font-semibold mb-7 sm:mb-10 pl-4 border-b dark:border-gray-600  pb-2">
              Overall Attendance Overview
            </h3>
            <div className="w-full flex justify-center">
              <LineChart
                label="Attendance Percentage"
                title="Monthly Attendance Percentage"
                chartData={attendancePercentage}
              />
            </div>
          </div>
        </div>

        <div className="sm:flex gap-2 justify-between md:flex-row flex-col h-auto md:h-[400px] mb-2">
          <div
            id="overflow"
            className="md:w-[60%] block h-full w-full mt-2 rounded-lg  dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  p-4 overflow-auto shadow"
          >
            <h3 className="text-[0.93rem] font-semibold mb-4 border-b dark:border-gray-600  pb-2">
              Attendace Overview By Department
            </h3>
            <div className="w-full pt-9 pr-6">
              <BarGraph
                departments={departments}
                title="Attendance Rate (%)"
                text="Employee Attendance Rate by Department"
                departmentAttendancePercentage={departmentAttendancePercentage}
              />
            </div>
          </div>

          <div
            id="overflow"
            className="md:w-[40%] h-full md:mt-2 rounded-lg dark:text-gray-200 text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-primary  py-4 px-1 mt-2 shadow"
          >
            <h3 className="text-[0.93rem] font-semibold md:mb-3 pl-4 border-b dark:border-gray-600  pb-2">
              Employee Category Distribution
            </h3>
            <div className="w-full flex justify-center items-center">
              <div className="py-4">
                <PieChart
                  labels={{ category1: "Male", category2: "Female" }}
                  label="Employee Category %"
                  title="Employee Category Overview"
                  data1={malePercentage}
                  data2={femalePercentage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
