import React, { useEffect } from "react";
import { formatDate } from "../../utils";
import { updateHead } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { getUpdates } from "../../services/insights.service";
import Loader from "../../components/shared/loaders/Loader";
import { Helmet } from "react-helmet";

function Update() {
  const dispatch = useDispatch();

  const { updates, loading } = useSelector((state) => state.update);

  useEffect(() => {
    dispatch(getUpdates());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Updates - Metro HR</title>
      </Helmet>

      {loading && <Loader />}

      <section className="bg-gray-100 border border-gray-300 dark:border-primary dark:bg-secondary p-3 h-[90vh] sm:min-h-screen rounded-lg shadow">
        <div className="flex justify-center items-center text-white">
          <div className="w-full rounded-2xl p-2">
            <div
              id="overflow"
              className="overflow-auto bg-gray-100 shadow h-[71vh] mt-2"
            >
              <table className="min-w-full table-auto text-sm text-white whitespace-nowrap">
                <thead>
                  <tr className="text-gray-200 bg-headLight">
                    {updateHead.map((header, i) => (
                      <th
                        key={i}
                        className="py-3 px-4 border-b border-gray-500"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {updates.length > 0 &&
                    updates.map((update, index) => (
                      <tr
                        key={index}
                        className="even:bg-gray-100 text-gray-700 odd:bg-gray-200  hover:bg-gray-300"
                      >
                        <td className="py-3 px-4 border-b border-gray-500">
                          {update.leaveType ? "Leave" : "Complaint"}
                        </td>
                        <td className="py-3 px-4 text-center border-b border-gray-500">
                          {update.leaveType
                            ? update.remarks.slice(0, 10) + "..."
                            : update.complainSubject.slice(0, 10) + "..."}
                        </td>
                        <td className="py-3 px-4 text-center border-b border-gray-500">
                          {update.leaveType
                            ? update.status === "Approved"
                              ? "Leave Approved"
                              : update.status === "Rejected"
                              ? "Leave Rejected"
                              : "Leave Pending"
                            : update.complaintDetails.slice(0, 15) + "..."}
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
                          {update.status}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-500">
                          {update.leaveType
                            ? formatDate(update.fromDate)
                            : formatDate(update.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-center border-b border-gray-500">
                          {update.leaveType
                            ? update.remarks.slice(0, 10)
                            : "--"}
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

            <div className="mt-2 bg-headLight border border-gray-200 p-7 rounded-lg text-center text-gray-200">
              <h2 className="text-lg font-semibold text-white">
                Total Updates
              </h2>
              <p className="text-2xl font-bold mt-3 text-white">
                {updates.length}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Update;
