import mongoose from "mongoose";

const leaveSchema = mongoose.Schema(
  {
    empName: {
      type: mongoose.Types.ObjectId,
      ref: "Employee",
    },
    // empName: {
    //   type: String,
    // },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    resumptionDate: {
      type: Date,
    },
    duration: {
      type: String,
    },
    status: {
      type: String,
      enum:["Pending","Approved","Declined"],
      default: "Pending",
    },
    Type: {
      type: mongoose.Types.ObjectId,
      ref: "LeaveType",
    },
  },
  { timestamps: true }
);

export const Leave = mongoose.model("Leave", leaveSchema);
