import React from "react";
import { Link } from "react-router-dom";

const EmailConfirmation = () => {
  return (
    <div className="h-[85vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center p-8 rounded-lg">
        <img
          className="w-[280px] sm:w-[430px] h-[250px]"
          src="/verify.avif"
          alt="verify_email"
        />
        <div className="flex flex-col justify-center items-center sm:w-[400px]">
          <p className="font-medium text-gray-800 text-center text-[0.9rem]">
            A password reset link has been sent to your email. Follow the
            instructions to reset password
          </p>
          <Link
            to="/"
            className="inline-block px-7 py-3 bg-blue-500 text-white text-sm font-medium rounded-md transition duration-300 hover:bg-blue-600 mt-6"
          >
            Back to Login Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
