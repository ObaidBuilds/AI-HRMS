import { useEffect, useState } from "react";
import { formatDate } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import {
  getLeavesByStatus,
  respondToLeaveRequest,
} from "../../services/leave.service";
import RemarksModal from "../../components/shared/modals/RemarksModal";
import Modal from "../../components/shared/modals/Modal";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";
import { leaveRequestButtons } from "../../data";

function LeaveRequest() {
  const dispatch = useDispatch();
  const { leaves = [], loading } = useSelector((state) => state.leave);
  const [status, setStatus] = useState("Pending");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleRemarkModal, setToggleRemarkModal] = useState(false);

  const handleApprove = (id) => {
    setSelectedLeave(id);
    setToggleModal(true);
  };

  const handleReject = (id) => {
    setSelectedLeave(id);
    setToggleRemarkModal(true);
  };

  const isConfirm = () => {
    dispatch(
      respondToLeaveRequest({ status: "approved", leaveID: selectedLeave })
    );

    setToggleRemarkModal(false);
  };

  const remarkConfirmation = (remarks) => {
    if (selectedLeave) {
      dispatch(
        respondToLeaveRequest({
          status: "rejected",
          leaveID: selectedLeave,
          remarks,
        })
      )
        .unwrap()
        .then(() => {
          setToggleRemarkModal(false);
        });
    }
  };

  useEffect(() => {
    dispatch(getLeavesByStatus(status));
  }, [status]);

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {leaveRequestButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setStatus}
              state={status}
              filter={filter}
            />
          ))}
        </div>
        <div id="overflow" className="overflow-x-auto min-h-[83vh]">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-headLight dark:bg-head text-primary">
                {[
                  "Emp ID",
                  "Name",
                  "Department",
                  "Position",
                  "Leave Type",
                  "From",
                  "To",
                  "Duration",
                  "Actions",
                ].map((header, i) => {
                  if (header === "Actions" && status !== "Pending") return null;
                  return (
                    <th key={i} className="py-3 px-4 border-b border-gray-500">
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-[0.83rem]">
              {leaves &&
                leaves.map((leave, index) => (
                  <tr
                    key={index}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-gray-500">
                      EMP {leave.employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.department?.name || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.employee.role?.name || "Null"}
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
            <NoDataMessage
              message={`  No ${status.toLowerCase()} leave found`}
            />
          )}
        </div>
      </section>

      {toggleModal && (
        <Modal
          action={"approve"}
          onClose={() => setToggleModal(false)}
          isConfirm={isConfirm}
        />
      )}

      {toggleRemarkModal && (
        <RemarksModal
          onClose={() => setToggleRemarkModal(false)}
          isConfirm={remarkConfirmation}
        />
      )}
    </>
  );
}

export default LeaveRequest;
