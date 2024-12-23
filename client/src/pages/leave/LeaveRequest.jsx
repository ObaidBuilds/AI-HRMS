import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatDate } from "../../utils";
import Heading from "../../components/shared/Heading";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/shared/Loader";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getLeavesByStatus, respondToLeaveRequest } from "../../services/leave";

function LeaveRequest() {
  const dispatch = useDispatch();
  const { leaves, loading } = useSelector((state) => state.leave);
  const [status, setStatus] = useState("Pending");

  const handleApprove = (leaveID) => {
    dispatch(respondToLeaveRequest({ status: "approved", leaveID }))
      .unwrap()
      .then(() => {
        if (leaves.length <= 1) {
          window.location.reload();
        }
      });
  };

  const handleReject = (leaveID) => {
    const remarks = prompt("Please add remarks of rejecting leave");
    if (!remarks) {
      toast.error("Remarks should not be empty");
      return;
    }
    dispatch(respondToLeaveRequest({ status: "rejected", leaveID, remarks }))
      .unwrap()
      .then(() => {
        if (leaves.length <= 1) {
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    dispatch(getLeavesByStatus(status));
  }, [status]);

  return (
    <div className="w-full rounded-lg bg-gray-900">
      {loading && <Loader />}
      <Heading heading={`${status} Leave Requests 🏖️`} />

      <section className="bg-gray-700 mt-2 p-3 sm:p-4 rounded-lg min-h-[90vh]">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => setStatus("Pending")}
            className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-2 px-5 rounded-3xl font-semibold ${
              status === "Pending"
                ? "border-blue-500 ring-1 ring-blue-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
          >
            Pending Leaves
          </button>
          <button
            onClick={() => setStatus("Approved")}
            className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-2 px-5 rounded-3xl font-semibold ${
              status === "Approved"
                ? "border-blue-500 ring-1 ring-blue-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
          >
            Approved Leaves
          </button>
          <button
            onClick={() => setStatus("Rejected")}
            className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-2 px-5 rounded-3xl font-semibold ${
              status === "Rejected"
                ? "border-blue-500 ring-1 ring-blue-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
          >
            Rejected Leaves
          </button>
        </div>
        <div id="overflow" className="overflow-x-auto">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-gray-600 text-gray-200">
                <th className="py-3 px-4 border-b border-gray-500">Emp ID</th>
                <th className="py-3 px-4 border-b border-gray-500">Name</th>
                <th className="py-3 px-4 border-b border-gray-500">
                  Department
                </th>
                <th className="py-3 px-4 border-b border-gray-500">Position</th>
                <th className="py-3 px-4 border-b border-gray-500">
                  Leave Type
                </th>
                <th className="py-3 px-4 border-b border-gray-500">From</th>
                <th className="py-3 px-4 border-b border-gray-500">To</th>
                <th className="py-3 px-4 border-b border-gray-500">Duration</th>
                {status === "Pending" && (
                  <th className="py-3 px-4 border-b border-gray-500 text-center">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="text-[0.83rem]">
              {leaves.length >= 1 &&
                leaves.map((leave, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-gray-500">
                      EMP {leave.employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.department.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.role.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.leaveType}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {formatDate(leave.fromDate)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {formatDate(leave.toDate)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.duration} days
                    </td>
                    {status === "Pending" && (
                      <td className="py-3 px-4 border-b border-gray-500 flex justify-center space-x-2 items-center">
                        <FaCheckCircle
                          className="text-green-500 cursor-pointer hover:text-green-600"
                          size={20}
                          onClick={() => handleApprove(leave._id)}
                          title="Approve"
                        />
                        <FaTimesCircle
                          className="text-red-500 cursor-pointer hover:text-red-600"
                          size={20}
                          onClick={() => handleReject(leave._id)}
                          title="Reject"
                        />
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
          {!loading && leaves.length === 0 && (
            <div className="w-full h-[50vh] flex flex-col justify-center items-center">
              <i className="fas fa-ban text-3xl text-gray-400"></i>
              <p className="mt-2 text-lg  text-gray-400">
                No {status} Leave Found
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default LeaveRequest;
