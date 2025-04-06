import React from "react";

const Error = () => {
  return (
    <div className="w-full h-[95vh] flex flex-col justify-center items-center">
      <p className="text-2xl">⚠️</p>
      <p className="mt-2 font-semibold text-[0.9rem] text-gray-600 dark:text-gray-200">
        Internal Server Error, Please Try Again Later
      </p>
    </div>
  );
};

export default Error;
