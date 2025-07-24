import multer from "multer";
import mongoose from "mongoose";
import path from "path";
import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Database Connection Utilities
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

const disConnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB Disconnected");
  } catch (error) {
    console.error(`MongoDB Disconnection Error: ${error.message}`);
    process.exit(1);
  }
};

// File Upload Configurations
const createImageStorage = () => {
  return new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
      folder: "uploads",
      allowed_formats: ["jpg", "png", "jpeg", "svg"],
      transformation: [{ quality: "auto", fetch_format: "auto" }],
      max_file_size: 2097152, // 2MB
    },
  });
};

const createResumeStorage = () => {
  return new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: (req, file) => {
      const allowedExtensions = [".pdf", ".doc", ".docx"];
      const fileExt = path.extname(file.originalname).toLowerCase();
      
      if (!allowedExtensions.includes(fileExt)) {
        throw new Error("Invalid file type");
      }

      const parsedName = path.parse(file.originalname);
      const sanitizedName = parsedName.name
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_-]/g, "");

      return {
        folder: "resumes",
        resource_type: "raw",
        allowed_formats: ["pdf", "doc", "docx"],
        public_id: `${sanitizedName}_${uuidv4().substring(0, 6)}`,
        format: fileExt.substring(1),
        transformation: [{
          flags: "attachment:inline",
          quality: "auto:best",
          fetch_format: "auto",
        }],
        max_file_size: 5242880, 
        invalidate: true,
        type: "authenticated",
        disposition: "inline",
      };
    },
  });
};

// Multer Initialization with Error Handling
const initializeUploader = (storage, options = {}) => {
  return multer({
    storage,
    limits: {
      fileSize: options.maxFileSize || 5242880, 
      files: options.maxFiles || 1,
    },
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = options.allowedMimeTypes || [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`Invalid file type. Only ${options.allowedTypes || 'specified'} files are allowed`), false);
      }
    },
  });
};

// Configure uploaders
const imageStorage = createImageStorage();
const resumeStorage = createResumeStorage();

const upload = initializeUploader(imageStorage, {
  allowedMimeTypes: ["image/jpeg", "image/png", "image/svg+xml"],
  maxFileSize: 2097152,
  allowedTypes: "JPG, PNG, JPEG, SVG"
});

const uploadResume = initializeUploader(resumeStorage, {
  allowedMimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  maxFileSize: 5242880, 
  allowedTypes: "PDF, DOC, DOCX"
});

export { connectDB, disConnectDB, upload, uploadResume };