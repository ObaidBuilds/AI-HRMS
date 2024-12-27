import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpdates } from "../../services/insights";

function Update() {
  const dispatch = useDispatch();
  const { updates } = useSelector((state) => state.update);

  useEffect(() => {
    dispatch(getUpdates());
  }, [dispatch]);

  return (
    <div className="w-full rounded-2xl h-[70vh] sm:h-[80vh] flex flex-col justify-center items-center">
      <div className="w-full">
        <div className="text-center my-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Update Board
          </h1>
        </div>

        <section className="mt-2 sm:p-4 flex justify-center rounded-lg">
          <div id="overflow" className="overflow-x-auto w-[90%] min-h-[40vh]">
            <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-gray-600 text-gray-200">
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
                {updates && updates.length > 0 ? (
                  updates.map((update, index) => (
                    <tr
                      key={index}
                      className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600"
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
                        className={`py-3 px-4 border-b border-gray-500 font-semibold ${
                          update.status === "Approved"
                            ? "text-green-400"
                            : update.status === "Pending"
                            ? "text-yellow-400"
                            : update.status === "Rejected"
                            ? "text-red-400"
                            : "text-blue-400"
                        }`}
                      >
                        {update.status}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {update.leaveType
                          ? new Date(update.fromDate).toLocaleDateString()
                          : new Date(update.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-500">
                        {update.leaveType ? update.remarks : update.remarks}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-4 px-4 text-center text-gray-400"
                    >
                      No updates found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {updates && updates.length === 0 && (
              <div className="w-full h-[50vh] flex flex-col justify-center items-center">
                <i className="fas fa-ban text-3xl text-gray-400"></i>
                <p className="mt-2 text-lg text-gray-400">
                  No updates available
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Update;
