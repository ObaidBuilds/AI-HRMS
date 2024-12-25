import React from "react";

const Heading = ({ heading }) => {
  return (
    <h1 className="w-full h-[50px] font-bold flex justify-center items-center text-[0.85rem] sm:text-[1.02rem] text-white border border-gray-500 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-md shadow-md animate-float">
      {heading}
    </h1>
  );
};

export default Heading;
