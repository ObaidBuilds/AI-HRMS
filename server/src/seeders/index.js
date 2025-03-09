import Employee from "../models/employee.model.js";
import Performance from "../models/performance.model.js";
import { calculateAverageAttendance } from "../controllers/attendance.controller.js";
import Payroll from "../models/payroll.model.js";

const generateRandomKPI = () => ({
  attendance: 0,
  rating: 0,
});

const generatePerformanceData = async () => {
  try {
    const employees = await Employee.find();

    if (!employees.length) {
      console.log("No employees found.");
      return;
    }

    const performanceData = [];

    for (const employee of employees) {
      const kpis = generateRandomKPI();
      kpis.attendance = await calculateAverageAttendance(employee._id);
      kpis.rating = 0;

      const kpiScore = kpis.attendance * 0.3 + kpis.rating * 0.7;

      performanceData.push({
        employee: employee._id,
        kpis,
        kpiScore,
        feedback: "",
      });
    }

    await Performance.insertMany(performanceData);
    console.log("Performance records added for all employees.");
  } catch (error) {
    console.error("Error generating performance data:", error);
  }
};

const deleteAllPerformanceRecords = async () => {
  try {
    await Performance.deleteMany({});
    console.log("All performance records deleted successfully.");
  } catch (error) {
    console.error("Error deleting performance records:", error);
  }
};

const generatePayrollDataForNMonths = async (months = 6) => {
  try {
    const employees = await Employee.find();

    if (!employees.length) {
      console.log("No employees found.");
      return;
    }

    const payrollData = [];

    for (const employee of employees) {
      for (let i = 0; i < months; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);

        const baseSalary = employee.salary || 30000;
        const allowances = Math.floor(baseSalary * 0.1);
        const deductions = Math.floor(baseSalary * 0.05);
        const bonuses = Math.random() > 0.8 ? Math.floor(baseSalary * 0.15) : 0;
        const netSalary = baseSalary + allowances + bonuses - deductions;

        payrollData.push({
          employee: employee._id,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          baseSalary,
          allowances,
          deductions,
          bonuses,
          netSalary,
          isPaid: Math.random() > 0.5,
          paymentDate: Math.random() > 0.5 ? date : null,
        });
      }
    }

    await Payroll.insertMany(payrollData);
    console.log(`Payroll records added for the last ${months} months.`);
  } catch (error) {
    console.error("Error generating payroll data:", error);
  }
};

// Run Seeder
const monthsToGenerate = 2;
// generatePayrollDataForNMonths(monthsToGenerate);

const deleteAllPayrollRecords = async () => {
  try {
    await Payroll.deleteMany({});
    console.log("All payroll records deleted successfully.");
  } catch (error) {
    console.error("Error deleting performance records:", error);
  }
};

export {
  generatePerformanceData,
  deleteAllPerformanceRecords,
  generatePayrollDataForNMonths,
  deleteAllPayrollRecords
};
