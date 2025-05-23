import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FetchError from "../../components/shared/error/FetchError";
import { getJobApplicants } from "../../services/recruitment.service";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils";
import FilterButton from "../../components/shared/buttons/FilterButton";
import { applicantsButtons } from "../../data";

function JobApplications() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobApplications, loading, error } = useSelector(
    (state) => state.recruitment
  );

  const [reviewFilter, setReviewFilter] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  console.log(jobApplications);

  useEffect(() => {
    dispatch(getJobApplicants({ status: reviewFilter, jobId: id }));
  }, [reviewFilter]);

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {applicantsButtons.map((filter, i) => (
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
                  "Name",
                  "Email",
                  "Phone",
                  "Resume",
                  "Cover letter",
                  "Status",
                  "Applied At",
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
              {jobApplications.length > 0 &&
                jobApplications.map((applicant, index) => (
                  <tr
                    key={applicant._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      {applicant.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {applicant.email}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {applicant.phone}
                    </td>

                    <td className="py-3 px-4 border-b border-secondary text-blue-500 underline">
                      <a
                        href={applicant.resume}
                        target="_blank"
                        className="hover:text-blue-700"
                      >
                        View Resume
                      </a>
                    </td>

                    {/* Description with Tooltip */}
                    <td
                      className="py-3 px-4 border-b border-secondary relative cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {applicant.coverLetter?.slice(0, 12) + "...."}

                      {hoveredIndex === index && (
                        <div className="absolute left-0 top-full mt-1 max-w-[300px] h-auto bg-gray-900 dark:bg-gray-200 dark:text-black text-white text-xs p-2 rounded shadow-lg z-10 break-words whitespace-normal">
                          <i className="fas fa-quote-left dark:text-gray-700 text-white mr-2"></i>
                          {applicant.coverLetter}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {applicant.status}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {formatDate(applicant.appliedAt)}
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

          {!loading && !error && jobApplications.length === 0 && (
            <NoDataMessage message={`No ${reviewFilter} applicant found`} />
          )}
          {error && <FetchError error={error} />}
        </div>
      </section>
    </>
  );
}

export default JobApplications;
