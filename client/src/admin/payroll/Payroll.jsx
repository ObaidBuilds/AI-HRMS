import { useEffect, useState } from "react";
import PerfromanceModal from "../../components/shared/modals/PerformanceModal";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../../components/shared/others/Pagination";
import Loader from "../../components/shared/loaders/Loader";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";
import { payrollButtons } from "../../data";
import { getAllPayrolls } from "../../services/payroll.service";

function Payroll() {
  const dispatch = useDispatch();
  const { payrolls, pagination, loading } = useSelector(
    (state) => state.payroll
  );

  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toggleModal, settoggleModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const goToPage = (page) => setCurrentPage(page);

  function handleClick(performance) {
    if (performance) {
      settoggleModal(true);
      setSelectedPayroll(performance);
    }
  }

  useEffect(() => {
    dispatch(getAllPayrolls({ status, currentPage }));
  }, [currentPage, status]);

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary p-3 sm:p-4 rounded-lg min-h-screen shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {payrollButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setStatus}
              state={status}
              filter={filter}
            />
          ))}
        </div>

        {/* Complaints Table */}
        <div id="overflow" className="overflow-x-auto min-h-[83vh]">
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="dark:bg-head bg-headLight text-primary">
                {[
                  "Name",
                  "Position",
                  "Basic Salary",
                  "Net Salary",
                  "Allownces",
                  "Detuctions",
                  "Payment Status",
                  "Actions",
                ].map((header, i) => (
                  <th key={i} className="py-3 px-4 border-b border-secondary">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[0.83rem]">
              {payrolls.length > 0 &&
                payrolls.map((payroll) => (
                  <tr
                    key={payroll._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      {payroll?.employee.name}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {payroll?.employee.role.name}
                    </td>
                    <td className="py-3 pl-7 border-b border-secondary">
                      {payroll.basicSalary}
                    </td>
                    <td className="py-3 pl-7 border-b border-secondary">
                      {payroll.netSalary}
                    </td>
                    <td className="py-3 pl-10 border-b border-secondary">
                      {payroll.allowances}
                    </td>{" "}
                    <td className="py-3 pl-10 border-b border-secondary">
                      {payroll.deductions}
                    </td>
                    <td className="py-3 pl-8 border-b border-secondary">
                      <span
                        className={`inline-flex items-center ${
                          payroll.paymentStatus === "Paid" ? "px-7" : "px-5"
                        } py-1 text-xs font-semibold text-white rounded-full  bg-gradient-to-r ${
                          payroll.paymentStatus == "Paid"
                            ? "from-green-500 to-green-600"
                            : payroll.paymentStatus == "Pending"
                            ? "from-yellow-500 to-yellow-600"
                            : "from-red-500 to-red-600"
                        }`}
                      >
                        {payroll.paymentStatus}
                      </span>
                    </td>
                    <td className="py-[14.5px] pl-8 border-b border-secondary flex items-center gap-3">
                      <button
                        onClick={() => handleClick(payroll)}
                        className="text-green-500 hover:text-green-400"
                        title="Add payroll"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && payrolls.length === 0 && (
            <NoDataMessage message={`No ${status} payroll found`} />
          )}
        </div>

        {/* Pagination */}
        {payrolls.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={goToPage}
          />
        )}

        {toggleModal && (
          <PerfromanceModal
            onClose={() => settoggleModal(false)}
            performance={selectedPayroll}
          />
        )}
      </section>
    </>
  );
}

export default Payroll;
