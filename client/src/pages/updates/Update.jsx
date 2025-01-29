import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpdates } from "../../services/insights.service";
import Loader from "../../components/shared/loaders/Loader";

function Update() {
  const dispatch = useDispatch();
  const { updates, loading } = useSelector((state) => state.update);

  useEffect(() => {
    dispatch(getUpdates());
  }, [dispatch]);

  return (
    <>
      {loading && <Loader />}
      <div className="w-full rounded-2xl sm:h-auto py-8 flex flex-col justify-center items-center">
        <div className="w-full">
          <div className="text-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Notice Board
            </h1>
          </div>

          <section className="mt-2 sm:p-4 flex flex-col items-center justify-center rounded-lg">
            <div
              id="overflow"
              className="overflow-auto rounded-lg w-[96%] sm:w-[90%] h-[55vh] bg-gray-100"
            >
              <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-gray-200 bg-gray-600">
                    {[
                      "Type",
                      "Subject",
                      "Description",
                      "Status",
                      "Date",
                      "Remarks",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="py-3 px-4 border-b border-gray-500"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {updates &&
                    updates.map((update, index) => (
                      <tr
                        key={index}
                        className="even:bg-gray-100 text-gray-700 odd:bg-gray-200  hover:bg-gray-300"
                      >
                        <td className="py-3 px-4 border-b border-gray-500">
                          {update.leaveType ? "Leave" : "Complaint"}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-500">
                          {update.leaveType
                            ? update.remarks
                            : update.complainSubject}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-500">
                          {update.leaveType
                            ? update.status === "Approved"
                              ? "Leave Approved"
                              : update.status === "Rejected"
                              ? "Leave Rejected"
                              : "Leave Pending"
                            : update.complaintDetails.slice(0, 20) + "..."}
                        </td>
                        <td
                          className={`py-3 px-4 border-b border-gray-500 font-bold ${
                            update.status === "Approved"
                              ? "text-green-400"
                              : update.status === "Pending"
                              ? "text-yellow-400"
                              : update.status === "Rejected"
                              ? "text-red-400"
                              : "text-blue-400"
                          }`}
                        >
                          {update.status.toUpperCase()}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-500">
                          {update.leaveType
                            ? new Date(update.fromDate).toLocaleDateString()
                            : new Date(update.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-500 text-green-600 font-semibold">
                          {update.leaveType
                            ? update.remarks.toUpperCase()
                            : update.remarks.toUpperCase()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {!loading && updates.length === 0 && (
                <div className="w-full h-[40vh] bg-gray-700 flex flex-col justify-center items-center">
                  <i className="fas fa-ban text-2xl text-gray-400"></i>
                  <p className="mt-2 text-base text-gray-400">
                    No updates available
                  </p>
                </div>
              )}
            </div>
            <div className="w-[95%] sm:w-[90%] mt-2 bg-gray-700 p-7 rounded-lg text-center">
              <h2 className="text-lg font-semibold text-white">
                Total Updates
              </h2>
              <p className="text-2xl font-bold mt-3">{updates.length}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Update;
