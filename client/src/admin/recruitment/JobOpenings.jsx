import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";
import { recruitmentButtons } from "../../data";
import FetchError from "../../components/shared/error/FetchError";
import { getJobOpenings } from "../../services/recruitment.service";
import { formatDate } from "../../utils";

function JobOpenings() {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.recruitment);

  const [reviewFilter, setReviewFilter] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    dispatch(getJobOpenings(reviewFilter));
  }, [reviewFilter]);

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {recruitmentButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setReviewFilter}
              state={reviewFilter}
              filter={filter}
            />
          ))}
        </div>

        <div id="overflow" className="overflow-x-auto min-h-[90vh]">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="dark:bg-head bg-headLight text-primary">
                {[
                  "Title",
                  "Department",
                  "Position",
                  "Salary",
                  "Type",
                  "Description",
                  "Status",
                  "Deadline",
                  "Action",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 border-b border-secondary"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 &&
                jobs.map((job, index) => (
                  <tr
                    key={job._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      {job.title}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {job.department.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {job.role.name}
                    </td>

                    <td className="py-3 px-4 border-b border-secondary">
                      Rs - {job.minSalary}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {job.type}
                    </td>

                    {/* Description with Tooltip */}
                    <td
                      className="py-3 px-4 border-b border-secondary relative cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {job.description?.slice(0, 12) + "...."}

                      {hoveredIndex === index && (
                        <div className="absolute left-0 top-full mt-1 max-w-[300px] h-auto bg-gray-900 dark:bg-gray-200 dark:text-black text-white text-xs p-2 rounded shadow-lg z-10 break-words whitespace-normal">
                          <i className="fas fa-quote-left dark:text-gray-700 text-white mr-2"></i>
                          {job.description}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 border-b border-secondary font-semibold">
                      <span
                        className={`inline-flex items-center px-8 py-1 text-xs font-semibold text-white rounded-full  bg-gradient-to-r ${
                          job.status === "Open"
                            ? "from-green-500 to-green-600"
                            : job.status === "Paused"
                            ? "from-yellow-500 to-yellow-600"
                            : "from-red-500 to-red-600"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 border-b border-secondary">
                      {formatDate(job.deadline)}
                    </td>
                    <td className="pl-7 px-4 border-b border-secondary">
                      <button>
                        <i className="fa-solid fa-sliders"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && !error && jobs.length === 0 && (
            <NoDataMessage message={"No Job opening found"} />
          )}
          {error && <FetchError error={error} />}
        </div>
      </section>
    </>
  );
}

export default JobOpenings;
