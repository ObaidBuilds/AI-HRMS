import QRCode from "qrcode";
import NodeCache from "node-cache";
import nodemailer from "nodemailer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

// __________Node Cache_______________

const myCache = new NodeCache();

// ________________QR Code Generation______________

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: "qrcodes",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(
            new Error(`Cloudinary upload failed: ${error.message}`)
          );
        }
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

async function generateQrCode(employeeId) {
  if (!employeeId) {
    console.error("Id not provided for QR code generation");
    return;
  }

  const qrData = JSON.stringify({
    employeeId,
  });

  try {
    const qrCodeBuffer = await QRCode.toBuffer(qrData);

    const uploadResult = await uploadToCloudinary(qrCodeBuffer);

    return uploadResult.secure_url;
  } catch (err) {
    console.error("Error generating or uploading QR code:", err);
  }
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
  const regex = /\/(?:v\d+\/)?([^/]+)\.\w+$/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

export { catchErrors, myCache, sendMail, generateQrCode, getPublicIdFromUrl };
