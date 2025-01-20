import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../services/employee";
import { useForm, Controller } from "react-hook-form";
import Loader from "../../components/shared/loaders/Loader";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);
  const departments = useSelector((state) => state.department.departments);
  const loading = useSelector((state) => state.employee.loading);

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    dispatch(addEmployee(data));
    reset();
  };

  return (
    <>
      {loading && <Loader />}
      <section>
        <div className="w-full min-h-screen rounded-lg text-gray-700 bg-gray-100 dark:bg-secondary border border-gray-300  dark:border-gray-600  p-3 text-sm">
          <form
            id="form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 sm:space-y-4"
          >
            {/* Basic Details */}
            <div className="dark:bg-gray-800 p-6 rounded-lg">
              <h4 className="dark:text-primary font-semibold mb-3">
                Basic Details
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="employeeId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Employee ID is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Employee ID"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Full Name is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Full Name"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: /^\S+@\S+$/i,
                  }}
                  render={({ field }) => (
                    <input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="dob"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Date of Birth is required" }}
                  render={({ field }) => (
                    <input
                      type="date"
                      placeholder="Date of Birth"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Phone Number is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Phone Number"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      <option value="">--Gender--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  )}
                />
                <Controller
                  name="martialStatus"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Marital Status is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      <option value="">--Marital Status--</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  )}
                />
              </div>
            </div>

            {/* Address Details */}
            <div className="dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="dark:text-primary font-semibold mb-3">Address</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="address.street"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Street"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="address.city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="City"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="address.state"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="State"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="address.postalCode"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Postal Code"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="address.country"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Country"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
              </div>
            </div>

            {/* Department & Role */}
            <div className="dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="dark:text-primary font-semibold mb-3">
                Department & Role
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="department"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Department is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      <option value="">--Department--</option>
                      {departments.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      <option value="">--Role--</option>
                      {roles.map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <Controller
                  name="salary"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Salary is required" }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Salary"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="shift"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Shift is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      <option value="">--Shift--</option>
                      <option value="Morning">Morning</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                  )}
                />
                <Controller
                  name="status"
                  control={control}
                  defaultValue="Active"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Leave">Leave</option>
                    </select>
                  )}
                />
                <Controller
                  name="dateOfJoining"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Date of Joining is required" }}
                  render={({ field }) => (
                    <input
                      type="date"
                      placeholder="Date of Joining"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="employmentType"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Employment Type is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      <option value="">--Employment Type--</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                    </select>
                  )}
                />
              </div>
            </div>

            {/* Bank Details */}
            <div className="dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="dark:text-primary font-semibold mb-3">
                Bank Details
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="bankDetails.accountNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Bank Account No"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="bankDetails.bankName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      <option value="">--Bank Name--</option>
                      <option value="HBL">HBL</option>
                      <option value="ABL">ABL</option>
                      <option value="GOP">GOP</option>
                    </select>
                  )}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="dark:text-primary font-semibold mb-3">
                Emergency Contact
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <Controller
                  name="emergencyContact.name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Emergency Contact Name"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
                <Controller
                  name="emergencyContact.relationship"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      <option value="">--Relationship--</option>
                      <option value="Father">Father</option>
                      <option value="Brother">Brother</option>
                      <option value="Friend">Friend</option>
                      <option value="Relative">Father</option>
                    </select>
                  )}
                />
                <Controller
                  name="emergencyContact.phoneNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Phone Number"
                      {...field}
                      className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    />
                  )}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-3xl mb-3"
            >
              Add Employee
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddEmployee;
