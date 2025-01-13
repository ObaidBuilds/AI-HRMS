import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.authentication);

  return (
    <section className="h-[60vh] sm:h-auto w-full flex flex-col">
      <div className="w-full flex justify-center">
        <div className="w-[70%] h-[50px] border-b border-gray-700 flex justify-center items-center">
          <ul className="flex items-center gap-4">
            <h1
              style={{
                fontFamily: "Bruno Ace",
              }}
            >
              {user.position.name}
            </h1>
          </ul>
        </div>
      </div>
      {/* <div className="w-full h-[300px] sm:h-[380px] flex justify-center items-center">
        <div className="border border-gray-700 w-[270px] h-[130px] sm:w-[300px] sm:h-[150px] bg-gray-700 rounded-xl ">
          <h1 className="text-sm font-semibold border-b border-gray-600 py-2 text-center text-white">
            Employee Details
          </h1>
          <div className="text-center"></div>
        </div>
      </div> */}
    </section>
  );
};

export default Home;
