import Payroll from "../models/payroll.model.js";
import { catchErrors } from "../utils/index.js";

const createPayroll = async (employee, basicSalary) => {
  if (!employee || !basicSalary) return;

  await Payroll.create({
    employee,
    basicSalary,
    allowances: 0,
    deductions: 0,
    netSalary: basicSalary,
    paymentStatus: "Pending",
  });
};

const getAllPayrolls = catchErrors(async (req, res) => {
  const { page = 1, limit = 13, employee, status } = req.query;

  const pageNumber = Math.max(parseInt(page), 1);
  const limitNumber = Math.max(parseInt(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const query = {};

  if (employee) query.employee = employee;
  if (status) query.paymentStatus = status;

  const payrolls = await Payroll.find(query)
    .populate({
      path: "employee",
      select: "name  role",
      populate: [{ path: "role", select: "name" }],
    })
    .skip(skip)
    .limit(limitNumber);

  const totalPayrolls = await Payroll.countDocuments(query);
  const totalPages = Math.ceil(totalPayrolls / limitNumber);

  return res.status(200).json({
    success: true,
    message: "Payroll records fetched successfully",
    payrolls,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalPayrolls,
      limit: limitNumber,
    },
  });
});

const getPayrollById = catchErrors(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Please provide payroll ID");

  const payroll = await Payroll.findById(id).populate({
    path: "employee",
    select: "name  role",
    populate: [{ path: "role", select: "name" }],
  });

  return res.status(200).json({
    success: true,
    message: "Payroll record fetched successfully",
    payroll,
  });
});

const updatePayroll = catchErrors(async (req, res) => {
  const { id } = req.params;
  const {
    basicSalary,
    allowances,
    deductions,
    netSalary,
    paymentStatus,
    remarks,
  } = req.body;

  if (!id) throw new Error("Please provide payroll ID");

  const payroll = await Payroll.findByIdAndUpdate(
    id,
    { basicSalary, allowances, deductions, netSalary, paymentStatus, remarks },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: "Payroll updated successfully",
    payroll,
  });
});

const deletePayroll = catchErrors(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new Error("Please provide payroll ID");

  await Payroll.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Payroll deleted successfully",
  });
});

export {
  createPayroll,
  getAllPayrolls,
  getPayrollById,
  updatePayroll,
  deletePayroll,
};
