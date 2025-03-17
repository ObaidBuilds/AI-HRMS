import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/shared/others/Pagination";
import {
  getComplaints,
  respondToComplaintRequest,
} from "../../services/complaint.service";
import Loader from "../../components/shared/loaders/Loader";
import { formatDate } from "../../utils";
import Modal from "../../components/shared/modals/Modal";
import RemarksModal from "../../components/shared/modals/RemarksModal";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";
import { complaintButtons } from "../../data";

function Complaint() {
  const dispatch = useDispatch();
  const { complaints, loading, pagination } = useSelector(
    (state) => state.complaint
  );

  const [status, setStatus] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleModal, setToggleModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [toggleRemarkModal, setToggleRemarkModal] = useState(false);

  const goToPage = (page) => setCurrentPage(page);

  const handleApprove = (id) => {
    setSelectedComplaint(id);
    setToggleModal(true);
  };

  const handleReject = (id) => {
    setSelectedComplaint(id);
    setToggleRemarkModal(true);
  };

  const isConfirm = () => {
    if (selectedComplaint) {
      dispatch(
        respondToComplaintRequest({
          complaintID: selectedComplaint,
          status: "resolved",
          remarks: "Approved",
        })
      );
      setToggleModal(false);
    }
  };

  const remarkConfirmation = (remarks) => {
    if (selectedComplaint) {
      dispatch(
        respondToComplaintRequest({
          complaintID: selectedComplaint,
          status: "closed",
          remarks,
        })
      );
      setToggleRemarkModal(false);
    }
  };

  useEffect(() => {
    dispatch(getComplaints({ status: status.toLowerCase(), currentPage }));
  }, [status, currentPage]);

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {complaintButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setStatus}
              state={status}
              filter={filter}
            />
          ))}
        </div>

        {/* Complaints Table */}
        <div id="overflow" className="overflow-x-auto min-h-[90vh]">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="dark:bg-head bg-headLight text-primary">
                {[
                  "Emp ID",
                  "Name",
                  "Department",
                  "Position",
                  "Complaint Type",
                  "Complaint Details",
                  "Date",
                  "Actions",
                ].map((header, i) => {
                  if (header === "Actions" && status !== "Pending") return null;
                  return (
                    <th key={i} className="py-3 px-4 border-b border-secondary">
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-[0.83rem]">
              {complaints.length > 0 &&
                complaints.map((complaint, index) => (
                  <tr
                    key={complaint._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      {complaint.employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {complaint.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {complaint.employee.department?.name || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {complaint.employee.role?.name || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {complaint.complainType} Issue
                    </td>
                    <td
                      className="relative py-3 px-4 border-b border-secondary"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {complaint.complaintDetails.slice(0, 20)}

                      {hoveredIndex === index && (
                        <div className="absolute left-0 top-full mt-1 max-w-[300px] h-auto bg-gray-900 dark:bg-gray-200 dark:text-black text-white text-xs p-2 rounded shadow-lg z-10 break-words whitespace-normal">
                          {complaint.complaintDetails}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {formatDate(complaint.createdAt)}
                    </td>
                    {status === "Pending" && (
                      <td className="py-3 px-4 border-b border-secondary flex justify-center space-x-2 items-center">
                        <FaCheckCircle
                          className="text-green-500 cursor-pointer hover:text-green-600"
                          size={20}
                          onClick={() => handleApprove(complaint._id)}
                          title="Approve"
                        />
                        <FaTimesCircle
                          className="text-red-500 cursor-pointer hover:text-red-600"
                          size={20}
                          onClick={() => handleReject(complaint._id)}
                          title="Reject"
                        />
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && complaints.length === 0 && (
            <NoDataMessage
              message={`  No ${status.toLowerCase()} complaint found`}
            />
          )}
        </div>

        {complaints.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={goToPage}
          />
        )}

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
      </section>
    </>
  );
}

export default Complaint;
