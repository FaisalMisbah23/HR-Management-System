import mongoose from "mongoose";
const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    employees: [{ type: mongoose.Types.ObjectId, ref: "Employee" }],
    Admins: [
      {
        type: mongoose.Types.ObjectId,
        ref: "HR",
      },
    ],
    targets: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Target",
      },
    ],
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema);
