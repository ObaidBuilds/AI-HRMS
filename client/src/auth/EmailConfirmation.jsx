import React from "react";

const EmailConfirmation = () => {
  return (
    <div className="h-[85vh] flex justify-center items-center"> 
      <div className="flex flex-col justify-center items-center p-8 rounded-lg"> 
        <img
          className="w-[280px] sm:w-[430px] h-[250px]"
          src="/verify.avif"
          alt="verify_email"
        />
        <div className="flex items-center mt-4"> 
          <p className="font-bold text-gray-800 text-center"> 
            Check your email to reset your password
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;