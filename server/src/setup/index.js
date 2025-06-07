import { connectDB, disConnectDB } from "../config/index.js";
import Employee from "../models/employee.model.js";
import { startHrmsApplication } from "../seeders/index.js";

async function setUpHrmsApplication() {
  try {
    await connectDB();
    const count = await Employee.countDocuments();
    if (count === 0) {
      await startHrmsApplication();
      console.log("Project setup successfully! 🎉");
    } else console.log("Project already setup. Skipping setup.");
  } catch (error) {
    console.log("Error in setup", error.message);
  } finally {
    await disConnectDB();
  }
}

setUpHrmsApplication();
