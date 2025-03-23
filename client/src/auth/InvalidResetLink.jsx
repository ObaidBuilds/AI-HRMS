import React from "react";

const InvalidResetLink = () => {
  return (
    <div className="h-[85vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center p-8 rounded-lg">
        <img
          className="w-[280px] sm:w-[430px] h-[250px]"
          src="/verify.avif"
          alt="verify_email"
        />
        <div className="flex items-center mt-4 sm:w-[400px]">
          <p className="font-semibold text-gray-800 text-center text-[0.9rem]">
          Oops! This reset link has expired or is invalid. Try requesting a new one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvalidResetLink;
