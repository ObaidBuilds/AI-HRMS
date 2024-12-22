import React from "react";

const ComponentLoader = () => {
  return (
    <div className="min-h-[95vh] flex justify-center items-center">
      <div className="loading-container">
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
        <div className="loading-circle"></div>
      </div>
    </div>
  );
};

export default ComponentLoader;
