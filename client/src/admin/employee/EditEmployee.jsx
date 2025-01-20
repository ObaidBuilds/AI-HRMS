import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { formatDate } from "../../utils";
import { editEmployee, getEmployeeById } from "../../services/employee";
import Error from "../../components/shared/error/Error";
import ComponentLoader from "../../components/shared/loaders/ComponentLoader";

const EditEmployee = () => {
  const { employeeID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roles = useSelector((state) => state.role.roles);
  const departments = useSelector((state) => state.department.departments);
  const { loading, employee } = useSelector((state) => state.employee);

  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    dispatch(editEmployee({ id: employeeID, employee: data }))
      .unwrap()
      .then(() => navigate("/employees"))
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  useEffect(() => {
    if (employeeID) {
      dispatch(getEmployeeById(employeeID));
    }
  }, [employeeID]);

  useEffect(() => {
    if (employee) {
      setValue("employeeId", employee.employeeId || "");
      setValue("name", employee.name || "");
      setValue("dob", formatDate(employee.dob));
      setValue("email", employee.email || "");
      setValue("phoneNumber", employee.phoneNumber || "");
      setValue("address.street", employee.address?.street || "");
      setValue("address.city", employee.address?.city || "");
      setValue("address.state", employee.address?.state || "");
      setValue("address.postalCode", employee.address?.postalCode || "");
      setValue("address.country", employee.address?.country || "");
      setValue("department", employee.department?._id || "");
      setValue("role", employee.role?._id || "");
      setValue("dateOfJoining", formatDate(employee.dateOfJoining));
      setValue("gender", employee.gender || "");
      setValue("martialStatus", employee.martialStatus || "");
      setValue("employmentType", employee.employmentType || "");
      setValue("shift", employee.shift || "");
      setValue("status", employee.status || "Active");
      setValue("salary", employee.salary || "");
      setValue(
        "bankDetails.accountNumber",
        employee.bankDetails?.accountNumber || ""
      );
      setValue("bankDetails.bankName", employee.bankDetails?.bankName || "");
      setValue("emergencyContact.name", employee.emergencyContact?.name || "");
      setValue(
        "emergencyContact.relationship",
        employee.emergencyContact?.relationship || ""
      );
      setValue(
        "emergencyContact.phoneNumber",
        employee.emergencyContact?.phoneNumber || ""
      );
      setValue("leaveBalance", employee.leaveBalance || 0);
      setValue("admin", employee.admin || false);
    }
  }, [employee]);

  if (loading) return <ComponentLoader />;
  if (!employee) return <Error />;

  return (
    <>
      <section className="w-full max-h-auto sm:min-h-screen rounded-lg bg-gray-100 dark:bg-secondary border border-gray-300 dark:border-gray-600 p-3 text-sm">
        <form
          id="form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 sm:space-y-4"
        >
          {/* Basic Details */}
          <div className="dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="dark:text-primary font-semibold mb-3 text-[0.95rem]">
              Basic Details
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="employeeId"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="Employee ID"
                    required
                  />
                )}
              />
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="email"
                    placeholder="Email"
                    required
                  />
                )}
              />
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="date"
                    placeholder="Date of Birth"
                    required
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="Phone Number"
                    required
                  />
                )}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    required
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
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    required
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
          <div className="dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="dark:text-primary font-semibold mb-3 text-[0.95rem]">
              Address
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="address.street"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="Street"
                  />
                )}
              />
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="City"
                  />
                )}
              />
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="State"
                  />
                )}
              />
              <Controller
                name="address.postalCode"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="Postal Code"
                  />
                )}
              />
              <Controller
                name="address.country"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="Country"
                  />
                )}
              />
            </div>
          </div>

          {/* Department & Role */}
          <div className="dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="dark:text-primary font-semibold mb-3 text-[0.95rem]">
              Department & Role
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    required
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
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    required
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
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="Salary"
                    required
                  />
                )}
              />
              <Controller
                name="shift"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    required
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
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="date"
                    placeholder="Date of Joining"
                    required
                  />
                )}
              />
              <Controller
                name="employmentType"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    required
                  >
                    <option value="">--Employment Type--</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* Bank Details */}
          <div className="dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="dark:text-primary font-semibold mb-3 text-[0.95rem]">
              Bank Details
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="bankDetails.accountNumber"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="Account Number"
                  />
                )}
              />
              <Controller
                name="bankDetails.bankName"
                control={control}
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
          <div className="dark:bg-gray-800 p-6 rounded-lg">
            <h4 className="dark:text-primary font-semibold mb-3 text-[0.95rem]">
              Emergency Contact
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="emergencyContact.name"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="Name"
                  />
                )}
              />
              <Controller
                name="emergencyContact.relationship"
                control={control}
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
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-gray-100 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    type="text"
                    placeholder="Phone Number"
                  />
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="p-4 bg-blue-600 font-semibold hover:bg-blue-700 text-white w-full rounded-3xl"
          >
            Update Employee
          </button>
        </form>
      </section>
    </>
  );
};

export default EditEmployee;
