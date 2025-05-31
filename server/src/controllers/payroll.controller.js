import Payroll from "../models/payroll.model.js";
import { catchErrors } from "../utils/index.js";

async function createPayrollForEmployee({ employee }) {
  await Payroll.create({
    employee: employee._id,
    month: 2,
    year: 2025,
    baseSalary: employee.salary,
    allowances: 0,
    deductions: 0,
    bonuses: 0,
    netSalary: employee.salary,
    isPaid: false,
  });
}

const createPayroll = catchErrors(async (req, res) => {
  const { employee, month, year, baseSalary, allowances, deductions, bonuses } =
    req.body;

  if (!employee || !month || !year || !baseSalary)
    throw new Error("Please provide all required fields");

  const payroll = await Payroll.create({
    employee,
    month,
    year,
    baseSalary,
    allowances,
    deductions,
    bonuses,
  });

  return res.status(201).json({
    success: true,
    message: "Payroll created successfully",
    payroll,
  });
});

const getAllPayrolls = catchErrors(async (req, res) => {
  const { page = 1, limit = 15, employee, month, year } = req.query;

  const query = {};

  if (year) query.year = year;
  if (month) query.month = month;
  if (employee) query.employee = employee;

  const pageNumber = Math.max(parseInt(page), 1);
  const limitNumber = Math.max(parseInt(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const payrolls = await Payroll.find(query)
    .populate("employee", "employeeId name")
    .skip(skip)
    .limit(limitNumber);

  if (!payrolls) throw new Error("Payroll record not found");

  const totalPayrolls = await Payroll.countDocuments(query);
  const totalPages = Math.ceil(totalPayrolls / limitNumber);

  return res.status(200).json({
    success: true,
    payrolls,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalPayrolls,
      limit: limitNumber,
    },
  });
});

const getPayrollByEmployee = catchErrors(async (req, res) => {
  const { employee, month, year } = req.query;

  if (!employee || !month || !year)
    throw new Error("Please provide employee, month, and year");

  const payroll = await Payroll.findOne({ employee, month, year }).populate(
    "employee",
    "name email"
  );

  if (!payroll) throw new Error("Payroll record not found");

  return res.status(200).json({
    success: true,
    payroll,
  });
});

const updatePayroll = catchErrors(async (req, res) => {
  const { payrollId } = req.params;
  const { allowances, deductions, bonuses } = req.body;

  const payroll = await Payroll.findById(payrollId);
  if (!payroll) throw new Error("Payroll record not found");

  payroll.allowances = allowances ?? payroll.allowances;
  payroll.deductions = deductions ?? payroll.deductions;
  payroll.bonuses = bonuses ?? payroll.bonuses;

  await payroll.save();

  return res.status(200).json({
    success: true,
    message: "Payroll updated successfully",
    payroll,
  });
});

const markAsPaid = catchErrors(async (req, res) => {
  const { payrollId } = req.params;

  const payroll = await Payroll.findById(payrollId);
  if (!payroll) throw new Error("Payroll record not found");

  payroll.isPaid = true;
  payroll.paymentDate = new Date();

  await payroll.save();

  return res.status(200).json({
    success: true,
    message: "Payroll marked as paid",
    payroll,
  });
});

const getEmployeePayrollHistory = catchErrors(async (req, res) => {
  const { employee } = req.params;

  const payrolls = await Payroll.find({ employee }).sort({
    year: -1,
    month: -1,
  });

  return res.status(200).json({
    success: true,
    payrolls,
  });
});

const deletePayroll = async (employee) => {
  if (!employee) throw new Error("Please provide employee Id");

  const payroll = await Payroll.deleteOne({ employee });

  if (payroll.deletedCount) return;

  return "Payroll deleted successfuly";
};

export {
  markAsPaid,
  deletePayroll,
  createPayroll,
  getAllPayrolls,
  updatePayroll,
  getPayrollByEmployee,
  getEmployeePayrollHistory,
  createPayrollForEmployee,
};
