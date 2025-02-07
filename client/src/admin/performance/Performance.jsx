import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/shared/others/Pagination";
import Loader from "../../components/shared/loaders/Loader";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";
import { performanceButtons } from "../../data";
import { getPerformances } from "../../services/performance.service";

function Perfromance() {
  const dispatch = useDispatch();
  const { performances, pagination, loading } = useSelector(
    (state) => state.performance
  );

  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  console.log(hoveredIndex);

  const goToPage = (page) => setCurrentPage(page);

  useEffect(() => {
    dispatch(getPerformances(currentPage));
  }, [currentPage]);

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {performanceButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setStatus}
              state={status}
              filter={filter}
            />
          ))}
        </div>

        {/* Complaints Table */}
        <div id="overflow" className="overflow-x-auto min-h-[77vh]">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="dark:bg-head bg-headLight text-primary">
                {[
                  "Emp ID",
                  "Name",
                  "Position",
                  "Tasks",
                  "Deadlines",
                  "Attendance",
                  "KPI Score",
                  "Feedback",
                ].map((header, i) => (
                  <th key={i} className="py-3 pl-4 border-b border-secondary">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[0.83rem]">
              {performances.length > 0 &&
                performances.map((performance, index) => (
                  <tr
                    key={performance._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      EMP {performance.employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {performance.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {performance.employee.role.name}
                    </td>
                    <td className="py-3 pl-7 border-b border-secondary">
                      {performance.kpis.taskCompletion === 0
                        ? "--"
                        : performance.kpis.taskCompletion}
                    </td>
                    <td className="py-3 pl-9 border-b border-secondary">
                      {performance.kpis.deadlinesMet === 0
                        ? "--"
                        : "performance.kpis.deadlinesMet"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary font-semibold">
                      <span
                        className={`inline-flex items-center px-8 py-1 text-xs font-semibold text-white rounded-full shadow-lg bg-gradient-to-r ${
                          performance.kpis.attendance >= 60
                            ? "from-green-500 to-green-600"
                            : performance.kpis.attendance >= 50
                            ? "from-yellow-500 to-yellow-600"
                            : "from-red-500 to-red-600"
                        }`}
                      >
                        {Math.floor(performance.kpis.attendance)} %
                      </span>
                    </td>

                    <td className="py-3 border-b border-secondary">
                      <span className="inline-flex items-center px-8 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg">
                        {Math.floor(performance.kpiScore)} %
                      </span>
                    </td>
                    <td
                      className="relative py-3 px-4 border-b border-secondary cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {performance.feedback.slice(0, 10) + "..."}

                      {hoveredIndex === index && (
                        <div className="absolute left-0 top-full mt-1 max-w-[300px] h-auto bg-gray-900 dark:bg-gray-200 dark:text-black text-white text-xs p-2 rounded shadow-lg z-10 break-words whitespace-normal">
                          {performance.feedback}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && performances.length === 0 && (
            <NoDataMessage message={`No performance metrics found`} />
          )}
        </div>
        {/* Pagination */}
        {performances.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={goToPage}
          />
        )}
      </section>
    </>
  );
}

export default Perfromance;
