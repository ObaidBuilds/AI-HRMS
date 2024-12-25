import React from "react";
import LineChart from "../../components/shared/charts/LineChart";

const Home = () => {
  return (
    <section>
      <div className="h-[65vh] flex flex-col justify-center items-center border-b border-gray-700">
        <h1
          className="text-3xl sm:text-4xl mb-2 sm:mb-4"
          style={{ fontFamily: "Bruno Ace, sans-serif" }}
        >
          Welcome 👋
        </h1>
        <h1
          className="text-3xl sm:text-4xl"
          style={{ fontFamily: "Bruno Ace, sans-serif" }}
        >
          Obaid Ali Siddiqui
        </h1>
      </div>
    </section>
  );
};

export default Home;
