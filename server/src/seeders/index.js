import Employee from "../models/employee.model.js";
import Performance from "../models/performance.model.js";
import { calculateAverageAttendance } from "../controllers/attendance.controller.js";
import { createPayroll } from "../controllers/payroll.controller.js";

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

const generatePayrollData = async () => {
  const employees = await Employee.find();

  if (!employees.length) {
    console.log("No employees found.");
    return;
  }

  for (const employee of employees) {
    await createPayroll(employee._id, employee.salary);
  }

  console.log("Payroll data created");
};

export {
  generatePerformanceData,
  deleteAllPerformanceRecords,
  generatePayrollData,
};
