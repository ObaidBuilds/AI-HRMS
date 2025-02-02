import { useEffect, useState } from "react";
import { formatDate } from "../../utils";
import { FaStar } from "react-icons/fa";
import { getFeedbacks } from "../../services/feedback.service";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import Pagination from "../../components/shared/others/Pagination";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";
import { feedbackButtons } from "../../data";

function Feedback() {
  const dispatch = useDispatch();
  const { feedbacks, loading, pagination } = useSelector(
    (state) => state.feedback
  );

  const [reviewFilter, setReviewFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getFeedbacks({ review: reviewFilter.toLowerCase(), currentPage }));
  }, [reviewFilter, currentPage]);

  console.log(feedbacks)

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary max-h-auto min-h-screen p-3 sm:p-4 rounded-lg shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {feedbackButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setReviewFilter}
              state={reviewFilter}
              filter={filter}
            />
          ))}
        </div>

        <div
          id="overflow"
          className="overflow-x-auto max-h-auto min-h-[72vh] sm:min-h-[80vh]"
        >
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-head text-primary">
                {[
                  "Emp ID",
                  "Name",
                  "Department",
                  "Position",
                  "AI Review",
                  "Description",
                  "Date",
                  "Rating",
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
              {feedbacks.length > 0 &&
                feedbacks.map((feedback, index) => (
                  <tr
                    key={index}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.employee.department.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.employee.role.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.review}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {feedback.description.slice(0, 10) + "..."}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {formatDate(feedback.createdAt)}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary flex items-center gap-2">
                      {feedback.rating} <FaStar color="gold" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && feedbacks.length === 0 && (
            <NoDataMessage message={"No feedback found"} />
          )}
        </div>
        {!loading && feedbacks.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </>
  );
}

export default Feedback;
