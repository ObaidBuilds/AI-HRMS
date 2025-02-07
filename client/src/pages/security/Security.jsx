import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePassword } from "../../services/authentication.service";

const Security = () => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const success = await updatePassword(setLoading, data);
    if (success) reset();
  };

  return (
    <section className="h-[80vh] flex justify-center items-center text-white">
      <div className="w-full sm:w-[95%] rounded-2xl p-5 sm:p-8">
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Old Password */}
          <div className="relative">
            <i className="fa fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="password"
              placeholder="Old Password"
              {...register("oldPassword", {
                required: "Old password is required",
              })}
              className="w-full bg-[#EFEFEF] text-gray-800 text-sm p-4 rounded-full border border-gray-200 pl-12 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <i className="fa fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="password"
              placeholder="New Password"
              {...register("newPassword", {
                required: "New password is required",
              })}
              className="w-full bg-[#EFEFEF] text-gray-800 text-sm p-4 rounded-full border border-gray-200 pl-12 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <i className="fa fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              {...register("confirmPassword", {
                required: "New password is required",
              })}
              type="password"
              placeholder="Confirm New Password"
              className="w-full bg-[#EFEFEF] text-gray-800 text-sm p-4 rounded-full border border-gray-200 pl-12 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-sm p-4 rounded-full font-medium hover:bg-blue-600 transition duration-300"
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin text-xs"></i>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Security;
