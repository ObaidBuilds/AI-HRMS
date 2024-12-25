import { sendMail } from "../utils/index.js";

async function notifySubstituteEmployee(
  email,
  subsName,
  name,
  shift,
  department,
  toDate,
  fromDate,
  duration
) {
  const message = {
    email,
    subject: "Metro Shift Alert",
    text: `Dear ${subsName}, your shift is scheduled on ${shift} as a substitute for ${name} in the ${department} department from ${fromDate} to ${toDate}. Please ensure your presence.`,
    html: `
    <div style="font-family: Poppins, Arial, sans-serif; max-width: 600px; margin: 30px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); background-color: #ffffff;">
      <div style="background-color: #333333; color: #fff; padding: 20px 30px; border-bottom: 1px solid #e0e0e0; display: flex; align-items: center;">
          <img src="https://img.freepik.com/premium-vector/metro-logo-icon-design_470209-40.jpg?ga=GA1.1.1159554069.1729552283&semt=ais_hybrid"
              alt="Metro Logo" style="max-width: 70px; border-radius: 8px; margin-right: 20px;">
          <h2 style="font-size: 22px; font-weight: 500; margin: 0;">Metro HRMS</h2>
      </div>
  
      <div style="padding: 25px 30px;">
          <p style="font-size: 16px; color: #555555; margin-bottom: 15px;">Dear <strong style="color: #000000;">${subsName}</strong>,</p>
          <p style="font-size: 16px; color: #555555; margin-bottom: 15px;">
              Your shift is scheduled on <strong style="color: #4CAF50;">${shift}</strong> as a substitute for <strong style="color: #000000;">${name}</strong>
              in the <strong style="color: #000000;">${department}</strong> department.
          </p>
          <p style="font-size: 16px; color: #555555; margin-bottom: 15px;">
              The shift is from <strong>${fromDate}</strong> to <strong>${toDate}</strong>, with a total duration of <strong>${duration}</strong> days.
          </p>
          <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">
              Please ensure your presence and cooperate with the team to maintain seamless operations.
          </p>
  
          <div style="text-align: center; margin-top: 20px;">
              <a href="https://metrohrms.netlify.app"
                  style="width: 85%; text-decoration: none; display: inline-block; border: none; background-color: #1F1F62; color: #fff; padding: 15px 25px; font-size: 0.9rem; border-radius: 25px; font-weight: bold;">
                  Visit HRMS Portal
              </a>
          </div>
      </div>
  
      <div style="background-color: #212121; color: #9e9e9e; text-align: center; padding: 20px; border-top: 1px solid #333333;">
          <p style="font-size: 14px; margin: 0;">
              If you have any questions, please contact HR at
              <a href="mailto:hr@metrohrms.com" style="color: #4CAF50; text-decoration: none;">hr@metrohrms.com</a>.
          </p>
          <p style="margin-top: 10px; font-size: 13px;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
      </div>
  </div>
  
      `,
  };

  await sendMail(message);
}

export { notifySubstituteEmployee };
