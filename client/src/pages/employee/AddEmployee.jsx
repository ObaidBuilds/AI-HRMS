import React, { useState } from "react";
import Loader from "../../components/shared/Loader";
import Heading from "../../components/shared/Heading";
import { addEmployee } from "../../services/employee";
import { useDispatch, useSelector } from "react-redux";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.role.roles);
  const departments = useSelector((state) => state.department.departments);
  const loading = useSelector((state) => state.employee.loading);

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    dob: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    department: "",
    role: "",
    dateOfJoining: "",
    gender: "",
    martialStatus: "",
    employmentType: "",
    shift: "",
    status: "Active",
    salary: "",
    bankDetails: {
      accountNumber: "",
      bankName: "",
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phoneNumber: "",
    },
    leaveBalance: 0,
    admin: false,
  });

  const handleChange = (field, value, subField) => {
    if (subField) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addEmployee(dispatch, formData);

    setFormData({
      employeeId: "",
      name: "",
      dob: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      department: "",
      role: "",
      dateOfJoining: "",
      gender: "",
      martialStatus: "",
      employmentType: "",
      shift: "",
      status: "Active",
      salary: "",
      bankDetails: {
        accountNumber: "",
        bankName: "",
      },
      emergencyContact: {
        name: "",
        relationship: "",
        phoneNumber: "",
      },
      leaveBalance: 0,
      admin: false,
    });
  };

  return (
    <section>
      {loading && <Loader />}

      <Heading heading={"Add Employee"} />
      <div className="w-full min-h-screen mt-2 rounded-lg bg-gray-700 border border-gray-600 p-3 text-sm">
        <form
          id="form"
          onSubmit={handleSubmit}
          className="space-y-2 sm:space-y-4"
        >
          {/* Basic Details */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">Basic Details</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Employee ID"
                value={formData.employeeId}
                onChange={(e) => handleChange("employeeId", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                required
              />
              <select
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                required
              >
                <option value="">--Gender--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <select
                value={formData.martialStatus}
                onChange={(e) => handleChange("martialStatus", e.target.value)}
                required
              >
                <option value="">--Marital Status--</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>
          </div>

          {/* Address Details */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">Address</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Street"
                value={formData.address.street}
                onChange={(e) =>
                  handleChange("address", e.target.value, "street")
                }
              />
              <input
                type="text"
                placeholder="City"
                value={formData.address.city}
                onChange={(e) =>
                  handleChange("address", e.target.value, "city")
                }
              />
              <input
                type="text"
                placeholder="State"
                value={formData.address.state}
                onChange={(e) =>
                  handleChange("address", e.target.value, "state")
                }
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={formData.address.postalCode}
                onChange={(e) =>
                  handleChange("address", e.target.value, "postalCode")
                }
              />
              <input
                type="text"
                placeholder="Country"
                value={formData.address.country}
                onChange={(e) =>
                  handleChange("address", e.target.value, "country")
                }
              />
            </div>
          </div>

          {/* Department & Role */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">
              Department & Role
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <select
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                required
              >
                <option value="">--Department--</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.name}
                  </option>
                ))}
              </select>

              <select
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                required
              >
                <option value="">--Role--</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Salary"
                value={formData.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
                required
              />
              <select
                value={formData.shift}
                onChange={(e) => handleChange("shift", e.target.value)}
                required
              >
                <option value="">--Shift--</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </select>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
              >
                <option value="">--Status--</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Leave">Leave</option>
              </select>
              <input
                type="date"
                placeholder="Date of Joining"
                value={formData.dateOfJoining}
                onChange={(e) => handleChange("dateOfJoining", e.target.value)}
                required
              />
              <select
                value={formData.employmentType}
                onChange={(e) => handleChange("employmentType", e.target.value)}
                required
              >
                <option value="">--Employment Type--</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">Bank Details</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Account Number"
                value={formData.bankDetails.accountNumber}
                onChange={(e) =>
                  handleChange("bankDetails", e.target.value, "accountNumber")
                }
              />
              <input
                type="text"
                placeholder="Bank Name"
                value={formData.bankDetails.bankName}
                onChange={(e) =>
                  handleChange("bankDetails", e.target.value, "bankName")
                }
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-gray-200 font-semibold mb-3">
              Emergency Contact
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Contact Name"
                value={formData.emergencyContact.name}
                onChange={(e) =>
                  handleChange("emergencyContact", e.target.value, "name")
                }
              />
              <select
                value={formData.emergencyContact.relationship}
                onChange={(e) =>
                  handleChange("emergencyContact", e.target.value)
                }
                required
              >
                <option value="">--Relationship--</option>
                <option value="Father">Father</option>
                <option value="Brother">Brother</option>
                <option value="Relative">Relative</option>
                <option value="Friend">Friend</option>
              </select>

              <input
                type="text"
                placeholder="Contact Phone Number"
                value={formData.emergencyContact.phoneNumber}
                onChange={(e) =>
                  handleChange(
                    "emergencyContact",
                    e.target.value,
                    "phoneNumber"
                  )
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-blue-700 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddEmployee;
