import { sendMail } from "../utils/index.js";

async function notifySubstituteEmployee({
  email,
  subsName,
  name,
  shift,
  department,
  toDate,
  fromDate,
  duration,
}) {
  const message = {
    email,
    subject: "Metro Shift Alert",
    text: `Dear ${subsName}, your shift is scheduled on ${shift} as a substitute for ${name} in the ${department} department from ${fromDate} to ${toDate}. Please ensure your presence.`,
    html: `
     <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 30px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); background-color: #ffffff;">
        <!-- Header Section -->
        <div style="background-color: #1A1A40; color: #fff; padding: 25px 30px; text-align: center;">
            <img src="https://metrohrms.netlify.app/metro.png" alt="Metro Logo" style="max-width: 80px; margin-bottom: 15px;">
            <h2 style="font-size: 24px; font-weight: 600; margin: 0;">Metro Cash & Carry</h2>
        </div>
    
        <!-- Main Content Section -->
        <div style="padding: 30px;">
            <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #1F1F62;">Shift Assignment Notification</h3>
            <p style="font-size: 16px; color: #555555; margin-bottom: 15px; line-height: 1.6;">Dear <strong style="color: #1F1F62;">${subsName}</strong>,</p>
            <p style="font-size: 16px; color: #555555; margin-bottom: 15px; line-height: 1.6;">
                Your shift is scheduled on <strong style="color: #4CAF50;">${shift}</strong> as a substitute for <strong style="color: #1F1F62;">${name}</strong>
                in the <strong style="color: #1F1F62;">${department}</strong> department.
            </p>
            <p style="font-size: 16px; color: #555555; margin-bottom: 15px; line-height: 1.6;">
                The shift is from <strong>${fromDate}</strong> to <strong>${toDate}</strong>, with a total duration of <strong>${duration}</strong> days.
            </p>
            <p style="font-size: 16px; color: #555555; margin-bottom: 20px; line-height: 1.6;">
                Please ensure your presence and cooperate with the team to maintain seamless operations.
            </p>
    
            <!-- Call-to-Action Button -->
            <div style="text-align: center; margin-top: 20px;">
                <a href="https://metrohrms.netlify.app"
                    style="text-decoration: none; background-color: #4CAF50; color: #fff; padding: 15px 30px; font-size: 16px; border-radius: 30px; font-weight: 600; display: inline-block; transition: background-color 0.3s ease;">
                    Visit HRMS Portal
                </a>
            </div>
        </div>
    
        <!-- Footer Section -->
        <div style="background-color: #1A1A40; color: #9e9e9e; text-align: center; padding: 20px; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 14px; margin: 0;">
                If you have any questions, please contact HR at
                <a href="mailto:hr@metrohrms.com" style="color: #4CAF50; text-decoration: none; font-weight: 600;">hr@metrohrms.com</a>.
            </p>
            <p style="margin-top: 10px; font-size: 13px;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
        </div>
    </div>
      `,
  };

  await sendMail(message);
}

async function passwordRecovery({ email, name, resetURL }) {
  const message = {
    email,
    subject: "Metro HRMS - Password Reset Request",
    html: `
       <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 30px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); background-color: #ffffff;">
    <!-- Header Section -->
    <div style="background-color: #1A1A40; color: #fff; padding: 25px 30px; text-align: center;">
        <img src="https://metrohrms.netlify.app/metro.png" alt="Metro Logo" style="max-width: 80px; margin-bottom: 15px;">
        <h2 style="font-size: 24px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">Metro Cash & Carry</h2>
    </div>

    <!-- Main Content Section -->
    <div style="padding: 30px; color: #333;">
        <h3 style="font-size: 22px; font-weight: 600; margin-bottom: 15px; color: #1A1A40;">Password Reset Request</h3>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">Dear <strong style="color: #1A1A40;">${name}</strong>,</p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
            We received a request to reset your password for Metro HRMS. Click the button below to set a new password.
        </p>
        <div style="text-align: center; padding: 25px 0;">
            <a href="${resetURL}"
                style="text-decoration: none; background-color: #4CAF50; color: #fff; padding: 15px 30px; font-size: 16px; border-radius: 30px; font-weight: 600; display: inline-block; transition: background-color 0.3s ease;">
                Reset Password
            </a>
        </div>
        <p style="font-size: 14px; color: #777; text-align: center; margin-top: 10px;">
            If you did not request this, please ignore this email or contact support.
        </p>
    </div>

    <!-- Footer Section -->
    <div style="background-color: #1A1A40; color: #9e9e9e; text-align: center; padding: 20px;">
        <p style="font-size: 14px; margin: 0;">Need assistance? Contact HR at <a href="mailto:hr@metrohrms.com"
                style="color: #4CAF50; text-decoration: none; font-weight: 600;">hr@metrohrms.com</a>.</p>
        <p style="margin-top: 10px; font-size: 13px;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
    </div>
</div>
        `,
  };

  await sendMail(message);
}

export { notifySubstituteEmployee, passwordRecovery };
