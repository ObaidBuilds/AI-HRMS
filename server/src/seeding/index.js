import Employee from "../models/employee.model.js";
import Performance from "../models/performance.model.js";
import { calculateAverageAttendance } from "../controllers/attendance.controller.js";

const generateRandomKPI = () => ({
  taskCompletion: 0,
  deadlinesMet: 0,
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

      const kpiScore =
        kpis.taskCompletion * 0.4 +
        kpis.attendance * 0.3 +
        kpis.deadlinesMet * 0.3;

      performanceData.push({
        employee: employee._id,
        kpis,
        kpiScore,
        feedback: "Auto-generated performance record",
      });
    }

    await Performance.insertMany(performanceData);
    console.log("Performance records added for all employees.");
  } catch (error) {
    console.error("Error generating performance data:", error);
  }
};

export default generatePerformanceData;
