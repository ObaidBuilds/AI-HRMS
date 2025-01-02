// import fs from "fs";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploads = join(__dirname, "..", "uploads");

// if (!fs.existsSync(uploads)) {
//   fs.mkdirSync(uploads, { recursive: true });
// }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploads);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export { connectDB, upload };
