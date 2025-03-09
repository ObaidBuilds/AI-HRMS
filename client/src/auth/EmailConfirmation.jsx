import React from "react";

const EmailConfirmation = () => {
  return (
    <div className="h-[85vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-[350px] sm:w-[430px] h-[250px]"
          src="/verify.avif"
          alt="verify_email"
        />
        <p className="text-[0.93rem] font-medium">
          Please check you email to reset your password
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmation;
