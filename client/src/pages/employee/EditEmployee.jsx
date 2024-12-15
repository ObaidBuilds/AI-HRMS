import { formatDate } from "../../utils";
import Error from "../../components/shared/Error";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import Loader from "../../components/shared/Loader";
import Heading from "../../components/shared/Heading";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { editEmployee, getEmployeeById } from "../../services/employee";

const EditEmployee = () => {
  const { employeeID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roles = useSelector((state) => state.role.roles);
  const departments = useSelector((state) => state.department.departments);
  const { loading, success, employee } = useSelector((state) => state.employee);

  const { control, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    dispatch(editEmployee({ id: employeeID, employee: data }));
  };

  useEffect(() => {
    if (employeeID) {
      dispatch(getEmployeeById(employeeID));
    }
  }, [employeeID, dispatch]);

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
  }, [employee, setValue]);

  useEffect(() => {
    if (success) navigate("/hrms/employees");
  }, [success]);

  if (!employee) return <Error />;

  return (
    <section>
      {loading && <Loader />}

      <Heading heading={"Edit Employee"} />
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
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Employee ID"
                    {...field}
                    required
                  />
                )}
              />
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...field}
                    required
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input type="email" placeholder="Email" {...field} required />
                )}
              />
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    {...field}
                    required
                  />
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Phone Number"
                    {...field}
                    required
                  />
                )}
              />
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <select {...field} required>
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
                  <select {...field} required>
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
                render={({ field }) => (
                  <input type="text" placeholder="Street" {...field} />
                )}
              />
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <input type="text" placeholder="City" {...field} />
                )}
              />
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <input type="text" placeholder="State" {...field} />
                )}
              />
              <Controller
                name="address.postalCode"
                control={control}
                render={({ field }) => (
                  <input type="text" placeholder="Postal Code" {...field} />
                )}
              />
              <Controller
                name="address.country"
                control={control}
                render={({ field }) => (
                  <input type="text" placeholder="Country" {...field} />
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
                render={({ field }) => (
                  <select {...field} required>
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
                  <select {...field} required>
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
                  <input type="text" placeholder="Salary" {...field} required />
                )}
              />
              <Controller
                name="shift"
                control={control}
                render={({ field }) => (
                  <select {...field} required>
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
                  <select {...field}>
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
                    type="date"
                    placeholder="Date of Joining"
                    {...field}
                    required
                  />
                )}
              />
              <Controller
                name="employmentType"
                control={control}
                render={({ field }) => (
                  <select {...field} required>
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
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">Bank Details</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="bankDetails.accountNumber"
                control={control}
                render={({ field }) => (
                  <input type="text" placeholder="Account Number" {...field} />
                )}
              />
              <Controller
                name="bankDetails.bankName"
                control={control}
                render={({ field }) => (
                  <input type="text" placeholder="Bank Name" {...field} />
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
                render={({ field }) => (
                  <input type="text" placeholder="Name" {...field} />
                )}
              />
              <Controller
                name="emergencyContact.relationship"
                control={control}
                render={({ field }) => (
                  <input type="text" placeholder="Relationship" {...field} />
                )}
              />
              <Controller
                name="emergencyContact.phoneNumber"
                control={control}
                render={({ field }) => (
                  <input type="text" placeholder="Phone Number" {...field} />
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 mt-4 w-full rounded-lg"
          >
            Update Employee
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditEmployee;
