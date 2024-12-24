import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Heading from "../../components/shared/Heading";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/shared/Pagination";
import {
  getComplaints,
  respondToComplaintRequest,
} from "../../services/complaint";
import Loader from "../../components/shared/Loader";
import { formatDate } from "../../utils";
import Modal from "../../components/shared/Modal";
import RemarksModal from "../../components/shared/RemarksModal";

function Complaint() {
  const dispatch = useDispatch();
  const { complaints, loading, pagination } = useSelector(
    (state) => state.complaint
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState("Pending");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
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
  }, [status, currentPage, dispatch]);

  return (
    <>
      {loading && <Loader />}
      <div className="w-full rounded-lg">
        {/* Heading */}
        <Heading heading={`${status} Complaint  👥`} />

        <section className="bg-gray-700 mt-2 p-3 sm:p-4 rounded-lg min-h-screen">
          <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setStatus("Pending")}
              className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
                status === "Pending"
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <i className="text-xs fas fa-thumbs-up"></i>
              Pending Complaints
            </button>
            <button
              onClick={() => setStatus("Resolved")}
              className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
                status === "Resolved"
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <i className="text-xs fas fa-thumbs-down"></i>
              Resolved Complaints
            </button>
            <button
              onClick={() => setStatus("Closed")}
              className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
                status === "Closed"
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <i className="text-xs fas fa-thumbs-down"></i>
              Closed Complaints
            </button>
          </div>

          {/* Complaint Table */}
          <div id="overflow" className="overflow-x-auto min-h-[77vh]">
            <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-gray-600 text-gray-200">
                  <th className="py-3 px-4 border-b border-gray-500">Emp ID</th>
                  <th className="py-3 px-4 border-b border-gray-500">Name</th>
                  <th className="py-3 px-4 border-b border-gray-500">
                    Department
                  </th>
                  <th className="py-3 px-4 border-b border-gray-500">
                    Position
                  </th>
                  <th className="py-3 px-4 border-b border-gray-500">
                    Complaint Type
                  </th>
                  <th className="py-3 px-4 border-b border-gray-500">
                    Complaint Details
                  </th>
                  <th className="py-3 px-4 border-b border-gray-500 text-center">
                    Date
                  </th>
                  {status === "Pending" && (
                    <th className="py-3 px-4 border-b border-gray-500 text-center">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="text-[0.83rem]">
                {complaints &&
                  complaints.map((complaint) => (
                    <tr
                      key={complaint._id}
                      className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600"
                    >
                      <td className="py-3 px-4 border-b border-gray-500">
                        {complaint.employee.employeeId}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {complaint.employee?.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {complaint.employee.department.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {complaint.employee.role.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {complaint.complainType}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {complaint.complaintDetails.slice(0, 20)}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {formatDate(complaint.createdAt)}
                      </td>
                      {status === "Pending" && (
                        <td className="py-3 px-4 border-b border-gray-500 flex justify-center space-x-2 items-center">
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
              <div className="w-full h-[50vh] flex flex-col justify-center items-center">
                <i className="fas fa-ban text-3xl text-gray-400"></i>
                <p className="mt-2 text-base text-gray-400">
                  No {status.toLowerCase()} complaint found
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {!complaints.length === 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination?.totalPages}
              onPageChange={goToPage}
            />
          )}

          {/* Modal */}
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
