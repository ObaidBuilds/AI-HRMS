import { Helmet } from "react-helmet";
import { formatDate } from "../../utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import FetchError from "../../components/shared/error/FetchError";
import InviteModal from "../../components/shared/modals/InviteModal";
import { getJobApplicants } from "../../services/recruitment.service";
import { applicantsButtons, jobApplicationHead } from "../../constants";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";
import ApplicationModal from "../../components/shared/modals/ApplicantionModal";

function JobApplications() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { jobApplications, loading, error } = useSelector(
    (state) => state.recruitment
  );

  const [reviewFilter, setReviewFilter] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [toggleInviteModal, setToggleInviteModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleClick = (application) => {
    if (application) {
      setToggleModal(true);
      setSelectedApplication(application);
    }
  };

  const handleInvite = (application) => {
    if (application) {
      setToggleInviteModal(true);
      setSelectedApplication(application);
    }
  };

  useEffect(() => {
    dispatch(
      getJobApplicants({ status: reviewFilter.toLowerCase(), jobId: id })
    );
  }, [reviewFilter]);

  if (error) return <FetchError error={error} />;

  return (
    <>
      <Helmet>
        <title>{reviewFilter} Job Applications - Metro HR</title>
      </Helmet>

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
                {jobApplicationHead.map((header, i) => (
                  <th key={i} className="py-3 px-4 border-b border-secondary">
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
                    {/* <td className="py-3 px-4 border-b border-secondary">
                      {applicant.phone}
                    </td> */}

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

                    <td className="py-3 border-b border-secondary font-semibold">
                      <span
                        className={`inline-flex items-center px-4 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${
                          applicant.status === "Applied"
                            ? "from-blue-400 to-blue-500"
                            : applicant.status === "Under Review"
                            ? "from-purple-400 to-purple-500"
                            : applicant.status === "Interview"
                            ? "from-indigo-400 to-indigo-500"
                            : applicant.status === "Hired"
                            ? "from-green-400 to-green-500"
                            : "from-red-400 to-red-500"
                        }`}
                      >
                        {applicant.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 border-b border-secondary">
                      {formatDate(applicant.appliedAt)}
                    </td>

                    <td className="pl-5 px-4 text-center border-b border-secondary">
                      <button
                        title="Update Status"
                        onClick={() => handleClick(applicant)}
                      >
                        <i className="fa-solid fa-sliders"></i>
                      </button>

                      {applicant.status !== "Hired" &&
                        applicant.status !== "Rejected" &&
                        applicant.status !== "Interview" && (
                          <button
                            title="Invite to Interview"
                            onClick={() => handleInvite(applicant)}
                            className="text-blue-500 hover:text-blue-700 transition-colors ml-3"
                          >
                            <i className="fa-solid fa-calendar-plus"></i>
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && !error && jobApplications.length === 0 && (
            <NoDataMessage message={`No ${reviewFilter} applicant found`} />
          )}

        </div>

        {toggleModal && (
          <ApplicationModal
            onClose={() => setToggleModal(false)}
            jobId={id}
            application={selectedApplication}
          />
        )}

        {toggleInviteModal && (
          <InviteModal
            onClose={() => setToggleInviteModal(false)}
            jobId={id}
            application={selectedApplication}
          />
        )}
      </section>
    </>
  );
}

export default JobApplications;
