import Employee from "../models/employee.model.js";
import Payroll from "../models/payroll.model.js";
import { catchErrors } from "../utils/index.js";

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
  const { page = 1, limit = 12, employee, month, year, isPaid } = req.query;

  const query = {};

  if (year) query.year = year;
  if (month) query.month = month;
  if (isPaid) query.isPaid = isPaid;
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
  const { allowances, bonuses, deductions } = req.body;

  const payroll = await Payroll.findById(payrollId).populate(
    "employee",
    "employeeId name"
  );
  if (!payroll) throw new Error("Payroll record not found");

  if (payroll.isPaid) throw new Error("Payroll already paid, can't update");

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

  const payroll = await Payroll.findById(payrollId).populate(
    "employee",
    "employeeId name"
  );
  if (!payroll) throw new Error("Payroll record not found");

  payroll.isPaid = !payroll.isPaid;
  payroll.paymentDate = new Date();

  await payroll.save();

  return res.status(200).json({
    success: true,
    message: "Payroll marked status updated",
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

  const payroll = await Payroll.deleteMany({ employee });

  if (payroll.deletedCount) return;

  return "Payroll deleted successfuly";
};

const generateEmployeeYearlyPayroll = async (
  employeeId,
  year = new Date().getFullYear()
) => {
  try {
    const currentYear = new Date().getFullYear();
    if (year < 2024 || year > currentYear + 1) {
      throw new Error(`Year must be between 2000 and ${currentYear + 1}`);
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) throw new Error("Employee not found");

    const existingRecords = await Payroll.countDocuments({
      employee: employeeId,
      year,
    });
    if (existingRecords > 0) {
      return;
    }

    const baseSalary = employee.salary || 30000;
    const payrollData = [];

    for (let month = 1; month <= 12; month++) {
      payrollData.push({
        employee: employee._id,
        month,
        year,
        baseSalary,
        allowances: 0,
        deductions: 0,
        bonuses: 0,
        netSalary: baseSalary,
        isPaid: false,
        paymentDate: null,
      });
    }

    await Payroll.insertMany(payrollData);

    return { success: true, recordsCreated: 12 };
  } catch (error) {
    throw error;
  }
};

export {
  markAsPaid,
  deletePayroll,
  createPayroll,
  getAllPayrolls,
  updatePayroll,
  getPayrollByEmployee,
  getEmployeePayrollHistory,
  generateEmployeeYearlyPayroll,
};
