import multer from "multer";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "svg"],
  },
});

const resumeStorage = new CloudinaryStorage({
  cloudinary:cloudinary.v2,
  params: (req, file) => {
    const ext = file.originalname.split(".").pop();
    const name = file.originalname.split(".")[0].replace(/\s+/g, "_");
    return {
      folder: "resumes",
      resource_type: "raw",
      allowed_formats: ["pdf", "doc", "docx"],
      public_id: name,
      format: ext,
    };
  },
});

const upload = multer({ storage });
const uploadResume = multer({ storage: resumeStorage });

export { connectDB, upload, uploadResume };
