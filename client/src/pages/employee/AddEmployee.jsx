import React from "react";
import Loader from "../../components/shared/Loader";
import Heading from "../../components/shared/Heading";
import { addEmployee } from "../../services/employee";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);
  const departments = useSelector((state) => state.department.departments);
  const loading = useSelector((state) => state.employee.loading);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addEmployee(data))
    reset();
  };

  return (
    <section>
      {loading && <Loader />}
      <Heading heading={"Add Employee"} />
      <div className="w-full min-h-screen mt-2 rounded-lg bg-gray-700 border border-gray-600 p-3 text-sm">
        <form
          id="form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 sm:space-y-4"
        >
          {/* Basic Details */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">Basic Details</h4>
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
                    className="input"
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
                    className="input"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
                render={({ field }) => (
                  <input
                    type="email"
                    placeholder="Email"
                    {...field}
                    className="input"
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
                    className="input"
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
                    className="input"
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
                    className="input"
                  />
                )}
              />
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <select {...field} className="input">
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
                  <select {...field} className="input">
                    <option value="">--Marital Status--</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* Address Details */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">Address</h4>
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
                    className="input"
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
                    className="input"
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
                    className="input"
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
                    className="input"
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
                    className="input"
                  />
                )}
              />
            </div>
          </div>

          {/* Department & Role */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">
              Department & Role
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="department"
                control={control}
                defaultValue=""
                rules={{ required: "Department is required" }}
                render={({ field }) => (
                  <select {...field} className="input">
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
                  <select {...field} className="input">
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
                    className="input"
                  />
                )}
              />
              <Controller
                name="shift"
                control={control}
                defaultValue=""
                rules={{ required: "Shift is required" }}
                render={({ field }) => (
                  <select {...field} className="input">
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
                  <select {...field} className="input">
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
                    className="input"
                  />
                )}
              />
              <Controller
                name="employmentType"
                control={control}
                defaultValue=""
                rules={{ required: "Employment Type is required" }}
                render={({ field }) => (
                  <select {...field} className="input">
                    <option value="">--Employment Type--</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">Bank Details</h4>
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
                    className="input"
                  />
                )}
              />
              <Controller
                name="bankDetails.bankName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select {...field} className="input">
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
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">
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
                    className="input"
                  />
                )}
              />
              <Controller
                name="emergencyContact.relationship"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select {...field} className="input">
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
                    className="input"
                  />
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white rounded"
          >
            Add Employee
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddEmployee;
