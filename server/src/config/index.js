// import fs from "fs";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

//  ___________________Mongoose Configuration_________________________
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// ___________________Multer Configuration_________________________
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "svg"],
  },
});

const upload = multer({ storage });

export { connectDB, upload };
