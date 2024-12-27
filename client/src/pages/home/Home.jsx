import React from "react";
import LineChart from "../../components/shared/charts/LineChart";

const Home = () => {
  return (
    <section className="h-auto w-full flex flex-col gap-[60px]">
      <div className="w-full flex justify-center">
        <div className="w-[70%] h-[50px] border-b border-gray-700 flex justify-center items-center">
          <ul className="flex items-center gap-4">
            <h1
              style={{
                fontFamily: "Bruno Ace",
              }}
            >
              Supervisor
            </h1>
          </ul>
        </div>
      </div>
      <div className="w-full h-[70%] flex justify-center items-center">
        <div className="border border-gray-700 w-[270px] h-[130px] sm:w-[300px] sm:h-[150px] bg-gray-700 rounded-xl ">
          <h1 className="text-sm font-semibold border-b border-gray-600 py-2 text-center">
            Employee Details
          </h1>
          <div className="text-center"></div>
        </div>
      </div>

      <div className="w-full flex gap-3 flex-col justify-center items-center mb-12">
        <h1 className="text-base font-semibold mb-1">Attendance Percentage</h1>
        <div className="w-full sm:w-[80%] h-[90px] flex items-center">
          <div className="w-1/2 h-full border-y border-r border-gray-700"></div>
          <div className="w-1/2 h-full border-y  border-gray-700"></div>
        </div>

      </div>
    </section>
  );
};

export default Home;
