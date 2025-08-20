import Role from "../models/role.model.js";
import Payroll from "../models/payroll.model.js";
import { getMonthName } from "../utils/index.js";
import Employee from "../models/employee.model.js";
import Department from "../models/department.model.js";
import Performance from "../models/performance.model.js";
import { calculateAverageAttendance } from "../controllers/attendance.controller.js";
import Attendance from "../models/attendance.model.js";

const startHrmsApplication = async () => {
  try {
    // First create the role
    const role = await Role.create({
      name: "Supervisor",
      description: "Dummy data entry of position by seeder function",
    });

    // Create the employee without department first
    const employee = await Employee.create({
      employeeId: "000",
      name: "Admin",
      dob: "1990-05-15T00:00:00.000Z",
      email: "admin@gmail.com",
      password: "$2b$10$k.1v4SeBsR.UYT4chI/O8OTkK5CO.MilaR8yCACtodqTZKm429rWG",
      profilePicture: "https://metrohrms.netlify.app/unknown.jpeg",
      qrCode: "",
      phoneNumber: "+1234567890",
      address: {
        street: "Kachupura",
        city: "Lahore",
        state: "Punjab",
        postalCode: "10001",
        country: "Pakistan",
      },
      role: role._id,
      department: "681146faec6adc26293c7466",
      dateOfJoining: "2020-01-10T00:00:00.000Z",
      gender: "Male",
      martialStatus: "Married",
      employmentType: "Full-Time",
      shift: "Morning",
      status: "Active",
      salary: 75000,
      bankDetails: {
        accountNumber: "123456789012",
        bankName: "Example Bank",
      },
      emergencyContact: {
        name: "Dummy User",
        relationship: "Spouse",
        phoneNumber: "+1987654321",
      },
      leaveBalance: 15,
      admin: true,
      forgetPasswordToken: null,
    });

    const department = await Department.create({
      name: "Marketing",
      description: "Dummy data entry of department by seeder function",
      head: employee._id,
    });

    await Employee.findByIdAndUpdate(employee._id, {
      department: department._id,
    });

    console.log("HRMS is ready to run, Have a nice day.");
  } catch (error) {
    console.error("Error setting up HRMS:", error);
    process.exit(1);
  }
};

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

const generatePayrollDataForMonths = async (month) => {
  try {
    if (month < 1 || month > 12) {
      throw new Error("Month must be between 1 (January) and 12 (December).");
    }

    const employees = await Employee.find();
    if (!employees.length) {
      console.log("No employees found.");
      return;
    }

    const currentYear = new Date().getFullYear();
    const payrollData = [];

    for (const employee of employees) {
      const baseSalary = employee.salary || 30000;
      const allowances = 0;
      const deductions = 0;
      const bonuses = 0;
      const netSalary = baseSalary;

      payrollData.push({
        employee: employee._id,
        month: month,
        year: currentYear,
        baseSalary,
        allowances,
        deductions,
        bonuses,
        netSalary,
        isPaid: false,
        paymentDate: null,
      });
    }

    await Payroll.insertMany(payrollData);
    console.log(
      `Generated payroll data for ${getMonthName(month)} ${currentYear} for ${
        employees.length
      } employees.`
    );
  } catch (error) {
    console.error("Error generating payroll data:", error);
  }
};

const generatePayrollDataForYear = async (year) => {
  try {
    const currentYear = new Date().getFullYear();
    if (year < 2024 || year > currentYear + 1) {
      throw new Error(`Year must be between 2000 and ${currentYear + 1}.`);
    }

    const employees = await Employee.find();
    if (!employees.length) {
      console.log("No employees found.");
      return;
    }

    const payrollData = [];

    for (const employee of employees) {
      const baseSalary = employee.salary || 30000;

      for (let month = 1; month <= 12; month++) {
        payrollData.push({
          employee: employee._id,
          month: month,
          year: year,
          baseSalary,
          allowances: 0,
          deductions: 0,
          bonuses: 0,
          netSalary: baseSalary,
          isPaid: false,
          paymentDate: null,
        });
      }
    }

    await Payroll.insertMany(payrollData);
    console.log(
      `Generated payroll data for all 12 months of ${year} for ${employees.length} employees.`
    );
  } catch (error) {
    console.error("Error generating yearly payroll data:", error);
  }
};

const deleteAllPayrollRecords = async () => {
  try {
    await Payroll.deleteMany({});
    console.log("All payroll records deleted successfully.");
  } catch (error) {
    console.error("Error deleting performance records:", error);
  }
};

const deleteTodayAttendanceRecords = async () => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    await Attendance.deleteMany({
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    console.log("Today's attendance records deleted successfully.");
  } catch (error) {
    console.error("Error deleting today's attendance records:", error);
  }
};

const alterEmployeeData = async () => {
  await Employee.updateMany(
    { profilePicture: "https://via.placeholder.com/50" },
    {
      $set: {
        profilePicture: "https://metrohrms.netlify.app/unknown.jpeg",
      },
    }
  );
  console.log("Altered");
};

export {
  alterEmployeeData,
  startHrmsApplication,
  generatePerformanceData,
  deleteAllPayrollRecords,
  generatePayrollDataForYear,
  deleteTodayAttendanceRecords,
  deleteAllPerformanceRecords,
  generatePayrollDataForMonths,
};
