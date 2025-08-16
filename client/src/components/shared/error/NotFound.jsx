import React from "react";

const NotFound = () => {
  return (
    <div className="h-[89vh] sm:h-[97vh] flex justify-center items-center text-sm">
      <div className="flex flex-col justify-center items-center">
        <i className="fas fa-ban text-2xl text-gray-500"></i>
        <p className="mt-2 text-base text-gray-500">404 Page not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
