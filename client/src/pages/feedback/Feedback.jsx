import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Heading from "../../components/shared/Heading";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/Loader";
import { getFeedbacks } from "../../services/feedback";
import Pagination from "../../components/shared/Pagination";
import { formatDate } from "../../utils";

function Feedback() {
  const dispatch = useDispatch();

  const { feedbacks, loading, pagination } = useSelector(
    (state) => state.feedback
  );

  const [review, setReview] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (page) => setCurrentPage(page);

  useEffect(() => {
    dispatch(getFeedbacks({ review, currentPage }));
  }, [review, currentPage]);

  return (
    <>
      {loading && <Loader />}

      <div className="w-full rounded-lg min-h-screen">
        <Heading heading={"Feedback Managment 💬"} />

        <section className="bg-secondary mt-2 p-3 sm:p-4 rounded-lg">
          <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setReview("")}
              className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
                review === ""
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <i class="text-xs fas fa-globe"></i>
              All Feedbacks
            </button>
            <button
              onClick={() => setReview("Positive")}
              className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
                review === "Positive"
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <i class="text-xs fas fa-thumbs-up"></i>
              Positive Feedbacks
            </button>
            <button
              onClick={() => setReview("Negative")}
              className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
                review === "Negative"
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <i class="text-xs fas fa-thumbs-down"></i>
              Negative Feedbacks
            </button>
            <button
              onClick={() => setReview("Neutral")}
              className={`flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-[0.81rem] sm:text-[0.9rem] border py-1 px-5 rounded-3xl font-semibold ${
                review === "Neutral"
                  ? "border-blue-500 ring-1 ring-blue-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <i class="text-xs fas fa-hand-paper"></i>
              Neutral Feedbacks
            </button>
          </div>
          <div id="overflow" className="overflow-x-auto min-h-[75vh]">
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
                    {" "}
                    AI Review
                  </th>
                  <th className="py-3 px-4 border-b border-gray-500">
                    {" "}
                    Description
                  </th>
                  <th className="py-3 px-4 border-b border-gray-500"> Date</th>
                  <th className="py-3 px-4 border-b border-gray-500">Rating</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-800 odd:bg-gray-700 hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-gray-500">
                      {feedback.employee.employeeId}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {feedback.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {feedback.employee.department.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {feedback.employee.role.name}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {feedback.review}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {feedback.description.slice(0, 10) + "..."}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500">
                      {formatDate(feedback.createdAt)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-500 flex items-center gap-2">
                      {feedback.rating} <FaStar color="gold" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && feedbacks.length === 0 && (
              <div className="w-full h-[50vh] flex flex-col justify-center items-center">
                <i className="fas fa-ban text-3xl text-gray-400"></i>
                <p className="mt-2 text-lg  text-gray-400">No feedback Found</p>
              </div>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={goToPage}
          />
        </section>
      </div>
    </>
  );
}

export default Feedback;
