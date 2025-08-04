import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/shared/loaders/Loader";
import Pagination from "../../components/shared/others/Pagination";
import NoDataMessage from "../../components/shared/error/NoDataMessage";
import FilterButton from "../../components/shared/buttons/FilterButton";
import { payrollButtons } from "../../data";
import { getAllPayrolls } from "../../services/payroll.service";
import { formatDate, getMonthAbbreviation } from "../../utils";
import FetchError from "../../components/shared/error/FetchError";

function Payroll() {
  const dispatch = useDispatch();

  const { payrolls, pagination, loading, error } = useSelector(
    (state) => state.payroll
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [payrollFilter, setPayrollFilter] = useState("");

  useEffect(() => {
    dispatch(getAllPayrolls({ currentPage }));
  }, [currentPage]);

  return (
    <>
      {loading && <Loader />}

      <section className="bg-gray-100 dark:bg-secondary max-h-auto min-h-screen p-3 sm:p-4 rounded-lg shadow">
        <div className="mb-4 sm:px-4 flex flex-wrap items-center gap-2 sm:gap-3">
          {payrollButtons.map((filter, i) => (
            <FilterButton
              key={i}
              setState={setPayrollFilter}
              state={payrollFilter}
              filter={filter}
            />
          ))}
        </div>

        <div
          id="overflow"
          className="overflow-auto min-h-[70vh] sm:min-h-[78vh] lg:w-[95%]"
        >
          <table className="min-w-full text-left table-auto border-collapse text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-headLight dark:bg-head text-primary">
                {[
                  "EMP ID",
                  "Name",
                  "Date",
                  "Base Salary",
                  "Allowances",
                  "Detuctions",
                  "Bonuses",
                  "Net Salary",
                  "Payment Status",
                  "Payment Date",
                  "Actions",
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
              {payrolls.length > 0 &&
                payrolls.map((payroll) => (
                  <tr
                    key={payroll._id}
                    className="dark:even:bg-gray-800 odd:bg-gray-200 dark:odd:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4 border-b border-secondary">
                      EMP {payroll?.employee?.employeeId || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {payroll?.employee?.name || "Null"}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      {getMonthAbbreviation(payroll.month)}, {payroll.year}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      RS - {payroll.baseSalary}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      RS - {payroll.allowances}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      RS - {payroll.deductions}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      RS - {payroll.bonuses}
                    </td>
                    <td className="py-3 px-4 border-b border-secondary">
                      RS - {payroll.netSalary}
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
                    <td className="py-3 px-4 border-b border-secondary flex items-center gap-3">
                      <button className="text-blue-500" title="Salary Paid">
                        <i className="fa-solid fa-circle-check"></i>
                      </button>
                      <button className="text-green-500 hover:text-green-400">
                        <i className="fa-solid fa-edit"></i>
                      </button>
                      <button className="text-red-500 hover:text-red-400">
                        <i className="fa-solid fa-trash"></i>
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
      </section>
    </>
  );
}

export default Payroll;
