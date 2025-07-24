import dotenv from "dotenv";
dotenv.config();

import { formatDate, formatTime, sendMail } from "../utils/index.js";

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
    subject: "Metro HRMS - Shift Alert",
    text: `Dear ${subsName}, your shift is scheduled on ${shift} as a substitute for ${name} in the ${department} department from ${fromDate} to ${toDate}. Please ensure your presence.`,
    html: `
      <div style="font-family: 'Poppins', system-ui; max-width: 480px; width: 100%; margin: 40px auto; background: #2c2c2c; padding: 32px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); text-align: center;">
        <img src="http://metrohrms.netlify.app/metro.png" alt="Metro Cash & Carry Logo" style="width: 120px; margin-bottom: 24px; max-width: 100%; height: auto;">
        <div style="font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 8px;">Metro Cash & Carry</div>
        <h2 style="color: #ffffff; font-weight: 500; font-size: 22px; margin-bottom: 16px;">Shift Assignment Notification</h2>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">Dear <strong style="color: #007bff;">${subsName}</strong>,</p>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
            Your shift is scheduled on <strong">${shift}</strong> as a substitute for <strong">${name}</strong>
            in the <strong">${department}</strong> department.
        </p>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
            The shift is from ${fromDate} to ${toDate}, with a total duration of ${duration} days.
        </p>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
            Please ensure your presence and cooperate with the team to maintain seamless operations.
        </p>
        <a href="${process.env.CLIENT_URL}" style="display: inline-block; padding: 12px 28px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 24px 0; transition: background 0.3s ease;">
            Visit HRMS Portal
        </a>
        <p style="font-size: 13px; color: #999999; margin-top: 16px;">If you have any questions, please contact HR at <strong>hr@metrohrms.com</strong>.</p>
        <div style="width: 100%; height: 1px; background: #444444; margin: 24px 0;"></div>
        <p style="margin-top: 24px; font-size: 12px; color: #999999;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
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
    <div
        style="font-family: 'Poppins',system-ui; max-width: 480px; width: 100%; margin: 40px auto; background: #2c2c2c; padding: 32px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); text-align: center;">
        <img src="http://metrohrms.netlify.app/metro.png" alt="Metro Cash & Carry Logo" class="logo"
            style="width: 120px; margin-bottom: 24px;">
        <div class="company-name" style="font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 8px;">Metro
            Cash & Carry</div>
        <h2 style="color: #ffffff; font-weight: 500; font-size: 22px; margin-bottom: 16px;">Password Reset Request</h2>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">Hello, ${name}</p>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">We received a request to reset your
            password for your <span style="color: #007bff; font-weight: 500;">Metro Cash & Carry</span> account. To
            proceed, please click the button below:</p>
        <a href="${resetURL}" class="button"
            style="display: inline-block; padding: 12px 28px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 24px 0; transition: background 0.3s ease;">Reset
            Password</a>
        <p class="note" style="font-size: 13px; color: #999999; margin-top: 16px;">If you did not request this password
            reset, you can safely ignore this email. The link will expire in <strong>30 minutes</strong>.</p>
        <div class="divider" style="width: 100%; height: 1px; background: #444444; margin: 24px 0;"></div>
        <p class="footer" style="margin-top: 24px; font-size: 12px; color: #999999;">For further assistance, please
            contact our support team at <br><strong>support@metrocc.com</strong>.</p>
    </div>
        `,
  };

  await sendMail(message);
}

async function resetPasswordSuccess({ email, name }) {
  const message = {
    email,
    subject: "Metro HRMS - Password Updated Successfully",
    html: `
       <div
        style="font-family: 'Poppins', system-ui; max-width: 480px; width: 100%; margin: 40px auto; background: #2c2c2c; padding: 32px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); text-align: center;">
        <img src="http://metrohrms.netlify.app/metro.png" alt="Metro Cash & Carry Logo"
            style="width: 120px; margin-bottom: 24px; max-width: 100%; height: auto;">
        <div style="font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 8px;">Metro Cash & Carry</div>
        <h2 style="color: #ffffff; font-weight: 600; font-size: 22px; margin-bottom: 16px;">Password Updated
            Successfully</h2>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">Hello <strong
                style="color: #007bff;">${name}</strong>,</p>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
            Your password has been successfully updated. If you did not make this change, please contact our support
            team immediately.
        </p>
        <a href="${process.env.CLIENT_URL}"
            style="display: inline-block; padding: 12px 28px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 24px 0; transition: background 0.3s ease;">
            Log In to Your Account
        </a>
        <p style="font-size: 13px; color: #999999; margin-top: 16px;">
            If you did not update your password, please contact our support team at <strong>support@metrocc.com</strong>
            immediately.
        </p>
        <div style="width: 100%; height: 1px; background: #444444; margin: 24px 0;"></div>
        <p style="margin-top: 24px; font-size: 12px; color: #999999;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
    </div>
          `,
  };

  await sendMail(message);
}

async function leaveRespond({ email, name, status, type }) {
  const message = {
    email,
    subject: `Metro HRMS - Leave Request ${status}`,
    html: `
          <div
        style="font-family: 'Poppins',system-ui; max-width: 480px; width: 100%; margin: 40px auto; background: #2c2c2c; padding: 32px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); text-align: center;">
        <img src="http://metrohrms.netlify.app/metro.png" alt="Metro Cash & Carry Logo"
            style="width: 120px; margin-bottom: 24px; max-width: 100%; height: auto;">
        <div style="font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 8px;">Metro Cash & Carry</div>
        <h2 style="color: #ffffff; font-weight: 600; font-size: 24px; margin-bottom: 16px;">Leave Request ${status}</h2>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">Hello <strong
                style="color: #007bff;">${name}</strong>,</p>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
            Your ${type} leave request has been <strong style="color: #4CAF50;">${status.toLowerCase()}</strong>.
        </p>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
            Please ensure all your tasks are handed over before your leave begins. Enjoy your time off!
        </p>
        <a href="${process.env.CLIENT_URL}"
            style="display: inline-block; padding: 12px 28px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 24px 0; transition: background 0.3s ease;">
            View Leave Details
        </a>
        <p style="font-size: 13px; color: #999999; margin-top: 16px;">
            If you have any questions, please contact HR at <strong>hr@metrocc.com</strong>.
        </p>
        <div style="width: 100%; height: 1px; background: #444444; margin: 24px 0;"></div>
        <p style="margin-top: 24px; font-size: 12px; color: #999999;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
    </div>
            `,
  };

  await sendMail(message);
}

async function complaintRespond({ email, name, status, type }) {
  const message = {
    email,
    subject: `Metro HRMS - Complaint ${status}`,
    html: `
          <div
        style="font-family: 'Poppins', system-ui; max-width: 480px; width: 100%; margin: 40px auto; background: #2c2c2c; padding: 32px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); text-align: center;">
        <img src="http://metrohrms.netlify.app/metro.png" alt="Metro Cash & Carry Logo"
            style="width: 120px; margin-bottom: 24px; max-width: 100%; height: auto;">
        <div style="font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 8px;">Metro Cash & Carry</div>
        <h2 style="color: #ffffff; font-weight: 600; font-size: 24px; margin-bottom: 16px;">Complaint ${status}</h2>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">Hello <strong
                style="color: #007bff;">${name}</strong>,</p>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
            We would like to inform you that your complaint of ${type} issue has been <strong style="color: #4CAF50;">${status.toLowerCase()}</strong>.
        </p>
        <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
            Thank you for bringing this matter to our attention. If you have any further concerns, please feel free to
            reach out to us.
        </p>
        <a href="${process.env.CLIENT_URL}"
            style="display: inline-block; padding: 12px 28px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 24px 0; transition: background 0.3s ease;">
            View Complaint Details
        </a>
        <p style="font-size: 13px; color: #999999; margin-top: 16px;">
            If you have any questions, please contact our support team at <strong>support@metrocc.com</strong>.
        </p>
        <div style="width: 100%; height: 1px; background: #444444; margin: 24px 0;"></div>
        <p style="margin-top: 24px; font-size: 12px; color: #999999;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
    </div>
              `,
  };

  await sendMail(message);
}

async function inviteForInterviewMail({
  email,
  candidateName,
  jobTitle,
  interviewDate,
  interviewTime,
  contactPerson = "hr@metrocc.com",
}) {
  const message = {
    email,
    subject: "Metro HRMS - Interview Invitation",
    html: `
        <div style="font-family: 'Poppins', system-ui; max-width: 480px; width: 100%; margin: 40px auto; background: #2c2c2c; padding: 32px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); text-align: center;">
          <img src="http://metrohrms.netlify.app/metro.png" alt="Metro Cash & Carry Logo" style="width: 120px; margin-bottom: 24px; max-width: 100%; height: auto;">
          <div style="font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 8px;">Metro Cash & Carry</div>
          <h2 style="color: #ffffff; font-weight: 500; font-size: 22px; margin-bottom: 16px;">Interview Invitation</h2>
          <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">Dear <strong style="color: #007bff;">${candidateName}</strong>,</p>
          <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
            Thank you for applying to the <strong>${jobTitle}</strong> position at Metro Cash & Carry.
            We're pleased to invite you for an interview on:
          </p>
          
          <div style="background: #3a3a3a; border-radius: 8px; padding: 16px; margin: 20px 0; text-align: center;">
            <div style="color: #ffffff; font-size: 18px; font-weight: 500;">${formatDate(
              interviewDate
            )}, ${formatTime(interviewTime)}</div>
          </div>
  
          <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
            Please confirm your attendance by replying to this email. For any queries, contact ${contactPerson}.
          </p>
  
          <p style="font-size: 13px; color: #999999; margin-top: 16px;">
            We look forward to meeting you!
          </p>
          <div style="width: 100%; height: 1px; background: #444444; margin: 24px 0;"></div>
          <p style="margin-top: 24px; font-size: 12px; color: #999999;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
        </div>
      `,
    text: `Dear ${candidateName},\n\nYou've been invited for an interview for ${jobTitle} position on ${interviewDate} at ${interviewTime}.\n\nPlease confirm your attendance. For queries, contact ${contactPerson}.\n\nBest regards,\nMetro HRMS Team`,
  };

  await sendMail(message);
}

async function thankYouForApplying({ 
  email, 
  candidateName, 
  jobTitle,
}) {
  const message = {
    email,
    subject: "Metro HRMS - Thank You for Your Application",
    html: `
     <div style="font-family: 'Poppins', system-ui; max-width: 480px; width: 100%; margin: 40px auto; background: #2c2c2c; padding: 32px; border-radius: 12px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3); text-align: center;">
    <img src="http://metrohrms.netlify.app/metro.png" alt="Metro Cash & Carry Logo" style="width: 120px; margin-bottom: 24px; max-width: 100%; height: auto;">
    <div style="font-size: 16px; font-weight: 600; color: #ffffff; margin-bottom: 8px;">Metro Cash & Carry</div>
    <h2 style="color: #ffffff; font-weight: 500; font-size: 22px; margin-bottom: 16px;">Thank You for Applying</h2>
    <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">Dear <strong style="color: #007bff;">${candidateName}</strong>,</p>
    <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
      We appreciate your application for the <strong>${jobTitle}</strong> position at Metro Cash & Carry.
    </p>
    
    <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin: 8px 0;">
      Our team is currently reviewing all applications. If your qualifications match our requirements,
      we'll contact you within the next 7-10 business days.
    </p>

    <a href="${process.env.CLIENT_URL}/careers" style="display: inline-block; padding: 12px 28px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500; margin: 24px 0; transition: background 0.3s ease;">
      View Other Opportunities
    </a>

    <div style="width: 100%; height: 1px; background: #444444; margin: 14px 0;"></div>
    <p style="margin-top: 24px; font-size: 12px; color: #999999;">Metro HRMS &copy; 2024. All Rights Reserved.</p>
  </div>
    `,
    text: `Dear ${candidateName},\n\nThank you for applying to the ${jobTitle} position at Metro Cash & Carry.\n\nOur team is reviewing applications and will contact you within 7-10 business days if your qualifications match our needs.\n\nFor questions about your application:\n${contactPerson}\n${contactEmail}\n\nView other opportunities: ${process.env.CLIENT_URL}\n\nBest regards,\nMetro HRMS Team`
  };

  await sendMail(message);
}

export {
  leaveRespond,
  passwordRecovery,
  complaintRespond,
  resetPasswordSuccess,
  notifySubstituteEmployee,
  inviteForInterviewMail,
  thankYouForApplying
};
