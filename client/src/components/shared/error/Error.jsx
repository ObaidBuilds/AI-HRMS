import React from "react";

const Error = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center text-sm">
      <div className="flex flex-col justify-center items-center">
        <i className="fas fa-ban text-2xl text-gray-500"></i>
        <p className="mt-2 text-base text-gray-500">Error Fetching Data</p>
      </div>
    </div>
  );
};

export default Error;
