import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/shared/others/Pagination";
import {
  getComplaints,
  respondToComplaintRequest,
} from "../../services/complaint";
import Loader from "../../components/shared/loaders/Loader";
import { formatDate } from "../../utils";
import Modal from "../../components/shared/modals/Modal";
import RemarksModal from "../../components/shared/modals/RemarksModal";

function Complaint() {
  const dispatch = useDispatch();
  const { complaints, loading, pagination } = useSelector(
    (state) => state.complaint
  );

  const [status, setStatus] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleModal, setToggleModal] = useState(false);
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
          {/* Filter Buttons */}
          <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
            {["Pending", "Resolved", "Closed"].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatus(filter)}
                className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.8rem] border py-1 px-5 rounded-3xl font-semibold ${
                  status === filter
                    ? "border-blue-500 ring-1 ring-blue-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <i
                  className={`text-xs fas ${
                    filter === "Pending" ? "fa-thumbs-up" : "fa-thumbs-down"
                  }`}
                ></i>
                {`${filter} Complaints`}
              </button>
            ))}
          </div>

          {/* Complaints Table */}
          <div id="overflow" className="overflow-x-auto min-h-[77vh]">
            <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-head text-primary">
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
                    if (header === "Actions" && status !== "Pending")
                      return null;
                    return (
                      <th
                        key={i}
                        className="py-3 px-4 border-b border-secondary"
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="text-[0.83rem]">
                {complaints.map(
                  ({
                    _id,
                    employee,
                    complainType,
                    complaintDetails,
                    createdAt,
                  }) => (
                    <tr
                      key={_id}
                      className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <td className="py-3 px-4 border-b border-secondary">
                        {employee.employeeId}
                      </td>
                      <td className="py-3 px-4 border-b border-secondary">
                        {employee.name}
                      </td>
                      <td className="py-3 px-4 border-b border-secondary">
                        {employee.department.name}
                      </td>
                      <td className="py-3 px-4 border-b border-secondary">
                        {employee.role.name}
                      </td>
                      <td className="py-3 px-4 border-b border-secondary">
                        {complainType}
                      </td>
                      <td className="py-3 px-4 border-b border-secondary">
                        {complaintDetails.slice(0, 20)}
                      </td>
                      <td className="py-3 px-4 border-b border-secondary">
                        {formatDate(createdAt)}
                      </td>
                      {status === "Pending" && (
                        <td className="py-3 px-4 border-b border-secondary flex justify-center space-x-2 items-center">
                          <FaCheckCircle
                            className="text-green-500 cursor-pointer hover:text-green-600"
                            size={20}
                            onClick={() => handleApprove(_id)}
                            title="Approve"
                          />
                          <FaTimesCircle
                            className="text-red-500 cursor-pointer hover:text-red-600"
                            size={20}
                            onClick={() => handleReject(_id)}
                            title="Reject"
                          />
                        </td>
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {!loading && complaints.length === 0 && (
              <div className="w-full h-[78vh] flex flex-col justify-center items-center">
                <i className="fas fa-ban text-2xl text-gray-400"></i>
                <p className="mt-2 text-sm text-gray-400">
                  No {status.toLowerCase()} complaints found.
                </p>
              </div>
            )}
          </div>
          {/* Pagination */}
          {complaints.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination?.totalPages}
              onPageChange={goToPage}
            />
          )}

          {/* Modals */}
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
