import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/shared/modals/Modal";
import Loader from "../../components/shared/loaders/Loader";
import { formatDate, getMonthAbbreviation } from "../../utils";
import FetchError from "../../components/shared/error/FetchError";
import Pagination from "../../components/shared/others/Pagination";
import { months, payrollButtons, payrollHead } from "../../constants";
import PayrollModal from "../../components/shared/modals/PayrollModal";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";
import { getAllPayrolls, markAsPaid } from "../../services/payroll.service";

function Payroll() {
  const dispatch = useDispatch();

  const { payrolls, pagination, loading, error } = useSelector(
    (state) => state.payroll
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);
  const [payrollFilter, setPayrollFilter] = useState("");
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [togglePayrollModal, setTogglePayrollModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const handleMarkAsPaid = () => {
    dispatch(markAsPaid(selectedId));
  };

  const confirmMarkAsPaid = () => {
    handleMarkAsPaid();
    setSelectedId(null);
    setShowConfirmModal(false);
  };

  useEffect(() => {
    dispatch(
      getAllPayrolls({
        currentPage,
        isPaid:
          payrollFilter === "paid" ? true : payrollFilter === "" ? "" : false,
        month: selectedMonth,
      })
    );
  }, [currentPage, payrollFilter, selectedMonth]);

  return (
    <>
      <Helmet>
        <title>{payrollFilter} Payrolls - Metro HR</title>
      </Helmet>

      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary max-h-auto sm:min-h-screen p-3 sm:p-4 rounded-lg shadow lg:w-[95%]">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {payrollButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setPayrollFilter}
              state={payrollFilter}
              filter={filter}
            />
          ))}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="hidden w-[200px] bg-transparent sm:flex flex-grow sm:flex-grow-0 justify-center items-center gap-2 text-sm font-semibold border py-1 px-5 rounded-3xl transition-all ease-in-out duration-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        </div>

        {/* Payroll Table */}
        <div
          id="overflow"
          className="overflow-auto min-h-[74vh] sm:min-h-[80vh]"
        >
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-headLight dark:bg-head text-primary">
                {payrollHead.map((header, i) => (
                  <th key={i} className="py-3 px-4 border-b border-secondary">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payrolls.length > 0 &&
                payrolls.map((payroll) => (
                  <tr
                    key={payroll._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      EMP {payroll.employee?.employeeId || "--"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {payroll.employee?.name || "--"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {getMonthAbbreviation(payroll.month)}, {payroll.year}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      RS - {payroll.baseSalary}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      RS - {payroll.allowances.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      RS - {payroll.deductions.toFixed(0)}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      RS - {payroll.bonuses.toFixed(0)}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      RS - {payroll.netSalary.toFixed(0)}
                    </td>

                    <td className="pl-7 border-b border-secondary font-semibold">
                      <span
                        className={`inline-flex items-center px-8 py-1 text-xs font-semibold text-white rounded-full  bg-gradient-to-r ${
                          payroll.isPaid
                            ? "from-green-500 to-green-600"
                            : "from-red-500 to-red-600"
                        }`}
                      >
                        {payroll.isPaid ? "Paid" : "Not"}
                      </span>
                    </td>
                    <td className="pl-7 px-4 border-b border-secondary">
                      {formatDate(payroll.paymentDate) || "Pending"}
                    </td>
                    <td className="py-3 justify-center border-b border-secondary flex items-center gap-3">
                      <button
                        title="Salary Paid"
                        onClick={() => {
                          setSelectedId(payroll._id);
                          setShowConfirmModal(true);
                        }}
                        className="text-blue-500"
                      >
                        <i className="fa-solid fa-circle-check"></i>
                      </button>
                      <button
                        title="Edit Payroll"
                        onClick={() => {
                          setSelectedPayroll(payroll);
                          setTogglePayrollModal(true);
                        }}
                        className="text-green-500 hover:text-green-400"
                      >
                        <i className="fa-solid fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {!loading && !error && payrolls.length === 0 && (
            <NoDataMessage message={"No payroll found"} />
          )}

          {error && <FetchError error={error} />}
        </div>

        {!loading && payrolls.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {showConfirmModal && (
          <Modal
            onClose={() => setShowConfirmModal(false)}
            action="mark as paid"
            isConfirm={confirmMarkAsPaid}
          />
        )}

        {togglePayrollModal && (
          <PayrollModal
            payroll={selectedPayroll}
            onClose={() => setTogglePayrollModal(false)}
          />
        )}
      </section>
    </>
  );
}

export default Payroll;
