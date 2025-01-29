import getPredictionFromGeminiAI from "../gemini/index.js";
import Employee from "../models/employee.model.js";


async function getSubstitute({ department, shift }) {
  let requiredShift;

  if (shift === "Morning") requiredShift = ["Evening", "Night"];
  else if (shift === "Evening") requiredShift = ["Morning", "Night"];
  else requiredShift = ["Morning", "Evening"];

  const employees = await Employee.find({
    status: "Active",
    department,
    shift: { $in: requiredShift },
  }).sort({ leaveBalance: -1 });

  if (!employees.length) {
    return { availability: false, message: "No suitable substitute found." };
  }

  const prompt = `
  You are an AI assistant helping to assign a substitute employee for a shift in the department "${department}".
  The following employees are available, and their details are as follows:
  ${employees
    .map(
      (emp, index) =>
        `${index + 1}. Name: ${emp.name}, Email: ${emp.email}, Current Shift: ${
          emp.shift
        }, Leave Balance: ${emp.leaveBalance}`
    )
    .join("\n")}
  
  The current shift requiring a substitute is "${shift}". 
  Your task is to suggest the most suitable substitute based on leave balance and shift compatibility. 
  If no perfect match is found, return the least possible match. 
  
  Please respond with **only** a valid JSON object in the following format:
  {
    "name": "Employee Name",
    "email": "employee@example.com"
  }`;

  let suggestedEmployee;

  try {
    const aiResponse = await getPredictionFromGeminiAI(prompt);

    const cleanedResponse = aiResponse.replace(/```json|```|\n/g, "").trim();

    suggestedEmployee = JSON.parse(cleanedResponse);

    if (!suggestedEmployee.name || !suggestedEmployee.email) {
      throw new Error("Incomplete JSON data from AI response.");
    }
  } catch (error) {
    console.error("Error with AI prediction or parsing:", error.message);

    suggestedEmployee = {
      name: employees[0].name,
      email: employees[0].email,
    };
  }

  return {
    availability: true,
    id: employees.find((e) => e.email === suggestedEmployee.email)?._id,
    email: suggestedEmployee.email,
    name: suggestedEmployee.name,
  };
}

function getSentimentAnalysis(rating) {
  if (rating >= 4) {
    return "Positive";
  } else if (rating === 3) {
    return "Neutral";
  } else {
    return "Negative";
  }
}

export { getSubstitute, getSentimentAnalysis };
