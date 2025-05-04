import React from "react";

const FetchError = ({ error }) => {

  return (
    <div className="w-full h-[70vh] flex flex-col justify-center items-center">
      <div className="text-sm bg-red-100 text-red-800 w-[250px] p-3 rounded-lg flex gap-3 items-start border border-red-200 shadow-sm border-l-4 border-l-red-500">
        <i class="fa-solid fa-triangle-exclamation text-red-600 text-lg"></i>
        <p className="text-[0.82rem]">{error}</p>
      </div>
    </div>
  );
};

export default FetchError;
