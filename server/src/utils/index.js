import QRCode from "qrcode";
import NodeCache from "node-cache";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// __________Node Cache_______________
const myCache = new NodeCache();

// ________________QR Code Generation______________

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const qrCodesDir = join(__dirname, "..", "qrcodes");

function generateQrCode(employeeId) {
  if (!employeeId) console.error("Id not provided for qrcode generation");

  const qrData = JSON.stringify({
    employeeId,
  });

  QRCode.toFile(`${qrCodesDir}/${employeeId}.png`, qrData, (err) => {
    if (err) {
      console.error("Error generating QR code:", err);
    }
  });

  return `${process.env.SERVER_URL}/qrcodes/${employeeId}.png`;
}

// _________Catch Asyn Errors Utility______________

const catchErrors = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err.message);
    });
  };
};

// _____________Nodemailer__________________

const sendMail = async (option) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.USER,
    to: option.email,
    subject: option.subject,
    text: option.text,
    html: option.html,
  });

  return info;
};

// ________ Cloudinary Public Url_____________

function getPublicIdFromUrl(url) {
  const regex = /\/(?:v\d+\/)?(uploads\/[^/]+)/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

export { catchErrors, myCache, sendMail, generateQrCode, getPublicIdFromUrl };
