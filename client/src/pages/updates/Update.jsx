import { Helmet } from "react-helmet";
import { formatDate } from "../../utils";
import { updateHead } from "../../constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUpdates } from "../../services/insights.service";
import Loader from "../../components/shared/loaders/Loader";

function Update() {
  const dispatch = useDispatch();

  const { updates, loading } = useSelector((state) => state.update);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    dispatch(getUpdates());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Updates ({updates.length.toString()}) - Metro HR</title>
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
                <tbody className="text-black">
                  {updates.length > 0 &&
                    updates.map((update, index) => (
                      <tr
                        key={update._id}
                        className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                      >
                        <td className="py-3 px-4 border-b border-secondary">
                          {update.employee?.employeeId || "--"}
                        </td>
                        <td className="py-3 px-4 border-b border-secondary">
                          {update.employee?.name || "--"}
                        </td>
                        <td className="py-3 px-4 border-b border-secondary">
                          {update.employee.department?.name || "--"}
                        </td>
                        <td className="py-3 px-4 border-b border-secondary">
                          {update.employee?.role?.name || "--"}
                        </td>
                        <td className="py-3 px-4 border-b border-secondary">
                          {update.type}
                        </td>
                        <td className="py-3 px-4 border-b border-secondary">
                          {update.status}
                        </td>

                        {/* Description with Tooltip */}
                        <td
                          className="py-3 px-4 border-b border-secondary relative cursor-pointer"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          {update.remarks.slice(0, 10) + "...."}

                          {hoveredIndex === index && (
                            <div className="absolute left-0 top-full mt-1 max-w-[300px] h-auto bg-gray-900 dark:bg-gray-200 dark:text-black text-white text-xs p-2 rounded shadow-lg z-10 break-words whitespace-normal">
                              <i className="fas fa-quote-left dark:text-gray-700 text-white mr-2"></i>
                              {update.remarks}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-4 border-b border-secondary">
                          {formatDate(update.createdAt)}
                        </td>
                        {/* <td className="py-3 px-4 border-b border-secondary flex items-center gap-2">
                          {feedback.rating} <FaStar color="gold" />
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>

              {!loading && updates.length === 0 && (
                <div className="w-full h-[60vh] flex flex-col justify-center items-center">
                  <i className="fas fa-ban text-2xl text-gray-400"></i>
                  <p className="mt-2 text-sm text-gray-400">
                    No update available
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
