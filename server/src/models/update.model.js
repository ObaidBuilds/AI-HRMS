import mongoose from "mongoose";

const updateSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    type: { type: String, required: true },
    status: { type: String, required: true },
    remarks: { type: String, required: true },
  },
  { timestamps: true }
);

const Update = mongoose.model("Update", updateSchema);
export default Update;
