import mongoose from "mongoose";
const leaveTypeSchema = mongoose.Schema(
  {
    leaveplan: { type: String, unique: true },
    duration: Number,
    reason: String,
    recall: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const LeaveType = mongoose.model("LeaveType", leaveTypeSchema);
