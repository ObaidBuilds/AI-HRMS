import multer from "multer";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";
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
  cloudinary: cloudinary.v2,
  params: (req, file) => {
    const parsedName = path.parse(file.originalname);
    const sanitizedName = parsedName.name
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_-]/g, "");
    const extension = parsedName.ext.substring(1).toLowerCase();

    const uniqueId = uuidv4().substring(0, 6);

    return {
      folder: "resumes",
      resource_type: "raw",
      allowed_formats: ["pdf", "doc", "docx"],
      public_id: `${sanitizedName}_${uniqueId}`,
      format: extension,
      transformation: [
        {
          flags: "attachment:inline",
          quality: "auto:best",
          fetch_format: "auto",
        },
      ],
      max_file_size: 5242880,
      invalidate: true,
      type: "authenticated",
      disposition: "inline",
    };
  },
});

const upload = multer({ storage });
const uploadResume = multer({ storage: resumeStorage });

export { connectDB, upload, uploadResume };
