import React from "react";

const NoDataMessage = ({ message }) => {
  return (
    <div className="w-full h-[78vh] flex flex-col justify-center items-center">
      <i className="fas fa-ban text-2xl text-gray-400"></i>
      <p className="mt-2 text-sm font-semibold text-gray-400">{message}</p>
    </div>
  );
};

export default NoDataMessage;
