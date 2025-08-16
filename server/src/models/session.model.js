import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  token: { type: String, required: true },
  authority: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;
