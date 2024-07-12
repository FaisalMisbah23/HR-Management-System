import mongoose from "mongoose";

const targetSchema = mongoose.Schema(
  {
    title: String,
    kpiweight: Number,
    empname: String,
    startdate: Date,
    enddate: Date,
    marking:{type:Boolean, default:false}
  },
  { timestamps: true }
);

export const Target = mongoose.model("Target", targetSchema);
