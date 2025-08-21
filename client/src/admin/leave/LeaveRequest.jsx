import { Helmet } from "react-helmet";
import { formatDate } from "../../utils";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import {
  getLeavesByStatus,
  respondToLeaveRequest,
} from "../../services/leave.service";
import Modal from "../../components/shared/modals/Modal";
import { leaveHead, leaveRequestButtons } from "../../constants";
import FetchError from "../../components/shared/error/FetchError";
import RemarksModal from "../../components/shared/modals/RemarksModal";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";

function LeaveRequest() {
  const dispatch = useDispatch();

  const { leaves, loading, error } = useSelector((state) => state.leave);

  const [status, setStatus] = useState("Pending");
  const [toggleModal, setToggleModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
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
    setToggleModal(false);
    dispatch(
      respondToLeaveRequest({ status: "Approved", leaveID: selectedLeave })
    );
  };

  const remarkConfirmation = (remarks) => {
    if (selectedLeave) {
      dispatch(
        respondToLeaveRequest({
          status: "Rejected",
          leaveID: selectedLeave,
          remarks,
        })
      );
      setToggleRemarkModal(false);
    }
  };

  useEffect(() => {
    dispatch(getLeavesByStatus(status));
  }, [status]);

  return (
    <>
      <Helmet>
        <title>{status} Leave Requests - Metro HR</title>
      </Helmet>

      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg sm:min-h-screen shadow">
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
        <div
          id="overflow"
          className="overflow-x-auto min-h-[74vh] sm:min-h-[80vh]"
        >
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-headLight dark:bg-head text-primary">
                {leaveHead.map((header, i) => {
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
                leaves.length > 0 &&
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
                      {leave.employee.department?.name || "--"}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {leave.leaveType} Leave
                    </td>
                    <td
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="py-3 px-4 border-b border-gray-500 text-center cursor-pointer"
                    >
                      {leave.description
                        ? leave.description.slice(0, 10) + "...."
                        : "--"}

                      {hoveredIndex === index && (
                        <div className="absolute left-0 top-full mt-1 max-w-[300px] h-auto bg-gray-900 dark:bg-gray-200 dark:text-black text-white text-xs p-2 rounded shadow-lg z-10 break-words whitespace-normal">
                          <i className="fas fa-quote-left dark:text-gray-700 text-white mr-2"></i>
                          {leave.description}
                        </div>
                      )}
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
                          size={20}
                          title="Approve"
                          onClick={() => handleApprove(leave._id)}
                          className="text-green-500 cursor-pointer hover:text-green-600"
                        />
                        <FaTimesCircle
                          size={20}
                          title="Reject"
                          onClick={() => handleReject(leave._id)}
                          className="text-red-500 cursor-pointer hover:text-red-600"
                        />
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && !error && leaves.length === 0 && (
            <NoDataMessage
              message={`  No ${status.toLowerCase()} leave found`}
            />
          )}

          {error && <FetchError error={error} />}
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
