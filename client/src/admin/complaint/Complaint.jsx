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
          status: "Resolved",
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
          status: "Closed",
          remarks,
        })
      );
      setToggleRemarkModal(false);
    }
  };

  useEffect(() => {
    dispatch(getComplaints({ status, currentPage }));
  }, [status, currentPage]);

  return (
    <>
      {loading && <Loader />}
      <div className="w-full rounded-lg">
        <section className="bg-gray-700 p-3 sm:p-4 rounded-lg min-h-screen">
          {/* Filter Buttons */}
          <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
            {["Pending", "Resolved", "Closed"].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatus(filter)}
                className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
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
                <tr className="bg-gray-600 text-gray-200">
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
                        className="py-3 px-4 border-b border-gray-500"
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
                      className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600"
                    >
                      <td className="py-3 px-4 border-b border-gray-500">
                        {employee.employeeId}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {employee.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {employee.department.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {employee.role.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {complainType}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {complaintDetails.slice(0, 20)}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {formatDate(createdAt)}
                      </td>
                      {status === "Pending" && (
                        <td className="py-3 px-4 border-b border-gray-500 flex justify-center space-x-2 items-center">
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
              <div className="w-full h-[50vh] flex flex-col justify-center items-center">
                <i className="fas fa-ban text-2xl text-gray-400"></i>
                <p className="mt-2 text-base text-gray-400">
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
      </div>
    </>
  );
}

export default Complaint;
