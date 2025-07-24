import dotenv from "dotenv";
dotenv.config();

import QRCode from "qrcode";
import jsQR from "jsqr";
import geolib from "geolib";
import { Jimp } from "jimp";
import axios from "axios";
import NodeCache from "node-cache";
import nodemailer from "nodemailer";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

const myCache = new NodeCache();

const workplaceLocation = {
  latitude: process.env.LATITUDE,
  longitude: process.env.LONGITUDE,
};

function getLocation(latitude, longitude) {
  const distance = geolib.getDistance(workplaceLocation, {
    latitude,
    longitude,
  });
  console.log(distance);
  return distance;
}

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

const catchErrors = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(err.message);
    });
  };
};

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

function getPublicIdFromUrl(url) {
  const regex = /\/(?:v\d+\/)?([^/]+)\.\w+$/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

const decodeQR = async (URL) => {
  try {
    const response = await axios({
      url: URL,
      responseType: "arraybuffer",
    });

    const image = await Jimp.read(Buffer.from(response.data));

    const imageData = {
      data: new Uint8ClampedArray(image.bitmap.data),
      width: image.bitmap.width,
      height: image.bitmap.height,
    };

    const decodedQR = jsQR(imageData.data, imageData.width, imageData.height);

    if (!decodedQR) {
      throw new Error("QR code not found in the image.");
    }
    return JSON.parse(decodedQR.data).employeeId;
  } catch (error) {
    console.error("Error decoding QR code:", error);
  }
};

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month}, ${year}`;
};

function formatTime(time24) {
  const [hours, minutes] = time24.split(':');
  
  const hoursNum = parseInt(hours, 10);
  const period = hoursNum >= 12 ? 'PM' : 'AM';
  const hours12 = hoursNum % 12 || 12; 
  return `${hours12}:${minutes} ${period}`;
}

export {
  catchErrors,
  myCache,
  sendMail,
  generateQrCode,
  getPublicIdFromUrl,
  getLocation,
  decodeQR,
  formatDate,
  formatTime
};
