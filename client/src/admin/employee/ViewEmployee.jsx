import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { formatDate } from "../../utils";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../components/shared/error/Error";
import { getEmployeeById } from "../../services/employee.service";
import ComponentLoader from "../../components/shared/loaders/ComponentLoader";

const ViewEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { employee, loading, error } = useSelector((state) => state.employee);

  useEffect(() => {
    if (id) {
      dispatch(getEmployeeById(id));
    }
  }, [id]);

  if (loading) return <ComponentLoader />;
  if (error || !employee) return <Error />;

  return (
    <>
      <Helmet>
        <title>{employee?.name}'s Detail - Metro HR</title>
      </Helmet>

      <section className="w-full rounded-lg text-gray-700 dark:text-primary">
        <div className="flex flex-col items-center bg-gray-100 dark:bg-navy p-5 rounded-lg mb-2 shadow">
          <img
            src={employee?.profilePicture || "/unknown.jpeg"}
            alt={employee.name}
            className="w-28 h-28 border-4 border-blue-500 rounded-full mb-4"
          />
          <h2 className="text-xl font-bold">{employee.name}</h2>
          <p className="text-gray-500">{employee.role.name}</p>
        </div>

        <main className="bg-gray-100 dark:bg-secondary p-4 sm:p-6 rounded-lg space-y-6 text-[0.88rem] shadow">
          <div>
            <h2 className="text-base font-semibold border-b border-gray-300 dark:border-gray-600 pb-2 mb-4">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <strong>Email:</strong> {employee.email}
              </p>
              <p>
                <strong>Phone:</strong> {employee.phoneNumber}
              </p>
              <p>
                <strong>Gender:</strong> {employee.gender}
              </p>
              <p>
                <strong>Date of Birth:</strong> {formatDate(employee.dob)}
              </p>
              <p>
                <strong>Marital Status:</strong> {employee.martialStatus}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {`${employee?.address?.street}, ${employee?.address?.city}, ${employee?.address?.country}`}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold border-b border-gray-300 dark:border-gray-600  pb-2 mb-4">
              Department Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <strong>Department:</strong> {employee?.department?.name}
              </p>
              <p>
                <strong>Position:</strong> {employee?.role?.name}
              </p>
              <p>
                <strong>Joining Date:</strong>{" "}
                {formatDate(employee?.dateOfJoining)}
              </p>
              <p>
                <strong>Work Shift:</strong> {employee?.shift}
              </p>
              <p>
                <strong>Employee Type:</strong> {employee?.employmentType}
              </p>
              <p>
                <strong>Status:</strong> {employee?.status}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold border-b border-gray-300 dark:border-gray-600  pb-2 mb-4">
              Salary Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <strong>Base Salary:</strong> {employee?.salary} PKR
              </p>
              <p>
                <strong>Leave Balance:</strong> {employee?.leaveBalance} days
              </p>
              <p>
                <strong>Bank Acc No:</strong>{" "}
                {employee?.bankDetails?.accountNumber}
              </p>
              <p>
                <strong>Bank Name:</strong> {employee?.bankDetails?.bankName}
              </p>
            </div>
          </div>

          <div className="pb-4">
            <h2 className="text-base font-semibold border-b border-gray-300 dark:border-gray-600  pb-2 mb-4">
              Emergency Contact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p>
                <strong>Contact Name:</strong>
                {employee?.emergencyContact?.name}
              </p>
              <p>
                <strong>Relationship:</strong>
                {employee?.emergencyContact?.relationship}
              </p>
              <p>
                <strong>Phone Number:</strong>
                {employee?.emergencyContact?.phoneNumber}
              </p>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default ViewEmployee;
