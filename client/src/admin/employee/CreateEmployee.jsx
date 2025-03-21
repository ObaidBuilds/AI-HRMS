import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../services/employee.service";
import { useForm, Controller } from "react-hook-form";
import Loader from "../../components/shared/loaders/Loader";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployeeSchema } from "../../validations";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);
  const departments = useSelector((state) => state.department.departments);
  const { loading, formLoading } = useSelector((state) => state.employee);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createEmployeeSchema),
  });

  const onSubmit = (data) => {
    dispatch(addEmployee(data));
    reset();
  };

  return (
    <>
      {loading && <Loader />}
      <section className="w-full min-h-screen rounded-lg text-gray-700 bg-white dark:bg-secondary border border-gray-300  dark:border-gray-600 p-3 text-sm">
        <form
          id="form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 sm:space-y-2 dark:sm:space-y-4 font-normal"
        >
          {/* Basic Details */}
          <div className="dark:bg-gray-800 text-[0.9rem] p-5 rounded-lg">
            <h4 className="dark:text-primary font-semibold mb-3 text-[0.95rem]">
              <i class="fas fa-user mr-2"></i>
              Basic Details
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 text-[0.82rem]">
              <Controller
                name="employeeId"
                control={control}
                defaultValue=""
                rules={{ required: "Employee ID is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Employee ID"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem]  rounded-lg dark:bg-[#4b5563]  border focus:border-blue-500 focus:outline-none ${
                        errors.employeeId
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.employeeId && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.employeeId.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Full Name is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Full Name"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="email"
                      placeholder="Email"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="password"
                      placeholder="Password"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="dob"
                control={control}
                defaultValue=""
                rules={{ required: "Date of Birth is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="date"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.dob
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.dob.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{ required: "Phone Number is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Phone Number"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.phoneNumber
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] bg-white focus:border-blue-500 focus:outline-none border ${
                        errors.gender
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    >
                      <option value="">--Gender--</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="martialStatus"
                control={control}
                defaultValue=""
                rules={{ required: "Marital Status is required" }}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg bg-white dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.martialStatus
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    >
                      <option value="">--Marital Status--</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                    {errors.martialStatus && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.martialStatus.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Address Details */}
          <div className="dark:bg-gray-800 text-[0.9rem] p-5 rounded-lg">
            <h4 className="dark:text-primary font-semibold mb-3">
              <i class="fas fa-map-marker-alt mr-2"></i>
              Address
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 text-[0.82rem]">
              <Controller
                name="address.street"
                control={control}
                defaultValue=""
                rules={{ required: "Street is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Street"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.address?.street
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.address?.street && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.address.street.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="address.city"
                control={control}
                defaultValue=""
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="City"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.address?.city
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.address?.city && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.address.city.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="address.state"
                control={control}
                defaultValue=""
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="State"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.address?.state
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.address?.state && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.address.state.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="address.postalCode"
                control={control}
                defaultValue=""
                rules={{
                  required: "Postal Code is required",
                  pattern: {
                    value: /^[0-9]{4,6}$/,
                    message: "Invalid Postal Code",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Postal Code"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.address?.postalCode
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.address?.postalCode && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.address.postalCode.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="address.country"
                control={control}
                defaultValue=""
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Country"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.address?.country
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.address?.country && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.address.country.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="dark:bg-gray-800 text-[0.9rem] p-5 rounded-lg">
            <h4 className="dark:text-primary font-semibold mb-3">
              <i class="fas fa-briefcase mr-2"></i>
              Department & Role
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 text-[0.82rem]">
              <Controller
                name="department"
                control={control}
                defaultValue=""
                rules={{ required: "Department is required" }}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg bg-white dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.department
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    >
                      <option value="">--Department--</option>
                      {departments.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.department.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="role"
                control={control}
                defaultValue=""
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg bg-white dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.role
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    >
                      <option value="">--Role--</option>
                      {roles.map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    {errors.role && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.role.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="salary"
                control={control}
                defaultValue=""
                rules={{ required: "Salary is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Salary"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg bg-white dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.salary
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.salary && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.salary.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="shift"
                control={control}
                defaultValue=""
                rules={{ required: "Shift is required" }}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg bg-white dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.shift
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    >
                      <option value="">--Shift--</option>
                      <option value="Morning">Morning</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                    {errors.shift && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.shift.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="employmentType"
                control={control}
                defaultValue=""
                rules={{ required: "Employement Type is required" }}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg bg-white dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.employmentType
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    >
                      <option value="">--Employement Type--</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                    </select>
                    {errors.employmentType && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.employmentType.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="dateOfJoining"
                control={control}
                defaultValue=""
                rules={{ required: "Date of Joining is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="date"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.dateOfJoining
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.dateOfJoining && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.dateOfJoining.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="status"
                control={control}
                defaultValue=""
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg bg-white dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.employmentType
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    >
                      <option value="">--Status--</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Leave">Leave</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Bank Details */}
          <div className="dark:bg-gray-800 text-[0.9rem] p-5 rounded-lg">
            <h4 className="dark:text-primary font-semibold mb-3">
              <i class="fas fa-university mr-2"></i>
              Bank Details
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 text-[0.82rem]">
              <Controller
                name="bankDetails.accountNumber"
                control={control}
                defaultValue=""
                rules={{ required: "Bank Account Number is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Bank Account No"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.bankDetails?.accountNumber
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.bankDetails?.accountNumber && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.bankDetails.accountNumber.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="bankDetails.bankName"
                control={control}
                defaultValue=""
                rules={{ required: "Bank Name is required" }}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg bg-white dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.bankDetails?.bankName
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    >
                      <option value="">--Bank Name--</option>
                      <option value="HBL">HBL</option>
                      <option value="ABL">ABL</option>
                      <option value="GOP">GOP</option>
                    </select>
                    {errors.bankDetails?.bankName && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.bankDetails.bankName.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="dark:bg-gray-800 text-[0.9rem] p-5 rounded-lg">
            <h4 className="dark:text-primary font-semibold mb-3">
              <i class="fas fa-user-shield mr-2"></i>
              Emergency Contact
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 text-[0.82rem]">
              <Controller
                name="emergencyContact.name"
                control={control}
                defaultValue=""
                rules={{ required: "Emergency Contact Name is required" }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Emergency Contact Name"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.emergencyContact?.name
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.emergencyContact?.name && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.emergencyContact.name.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="emergencyContact.relationship"
                control={control}
                defaultValue=""
                rules={{ required: "Relationship is required" }}
                render={({ field }) => (
                  <div>
                    <select
                      {...field}
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg bg-white dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.emergencyContact?.relationship
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    >
                      <option value="">--Relationship--</option>
                      <option value="Father">Father</option>
                      <option value="Brother">Brother</option>
                      <option value="Friend">Friend</option>
                      <option value="Relative">Relative</option>
                    </select>
                    {errors.emergencyContact?.relationship && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.emergencyContact.relationship.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="emergencyContact.phoneNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Invalid phone number",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <input
                      {...field}
                      type="text"
                      placeholder="Phone Number"
                      className={`w-full p-[0.75rem] dark:p-[0.7rem] rounded-lg dark:bg-[#4b5563] focus:border-blue-500 focus:outline-none border ${
                        errors.emergencyContact?.phoneNumber
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600"
                      } text-gray-800 dark:text-gray-200`}
                    />
                    {errors.emergencyContact?.phoneNumber && (
                      <p className="text-red-500 text-[0.8rem] mt-1">
                        {errors.emergencyContact.phoneNumber.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || formLoading}
            className="w-full p-4 font-semibold text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-3xl mb-3 transition-all ease-in-out duration-150"
          >
            {formLoading ? (
              <span className="flex items-center gap-2 justify-center">
                <i className="fas fa-spinner fa-spin text-xs"></i>
                Creating Employee
              </span>
            ) : (
              "Create Employee"
            )}
          </button>
        </form>
      </section>
    </>
  );
};

export default AddEmployee;
