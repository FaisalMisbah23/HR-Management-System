import { LeaveType } from "../models/LeaveType.model.js";
import { Leave } from "../models/leave.model.js";
import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/apiError.js";
import ApiResponse from "../utility/apiResponse.js";
import { isValidObjectId } from "mongoose";
import { Employee } from "../models/employee.model.js";
import { HR } from "../models/hr.model.js";

export const createLeave = asyncHandler(async (req, res) => {
  const { startDate, endDate, resumptionDate, type } = req.body;

  // Validate all required fields
  if (!startDate || !endDate || !resumptionDate || !type) {
    throw new ApiError(401, "All fields are required");
  }
  // Convert strings to Date objects for comparison
  const start = new Date(startDate);
  const end = new Date(endDate);
  const resumption = new Date(resumptionDate);

  if (start >= end) {
    throw new ApiError(401, "End date must be after start date");
  }
  if (end >= resumption) {
    throw new ApiError(401, "Resumption date must be after end date");
  }

  // Check if leave type exists
  const leaveType = await LeaveType.findOne({ leaveplan: type });
  if (!leaveType) {
    throw new ApiError(401, "This type of leave plan does not exist");
  }

  // Check if a leave already exists on any of the dates
  const isLeaveExistOnEnterDate = await Leave.findOne({
    empName:req.employee._id,
    $or: [
      { startDate: { $lte: end, $gte: start } },
      { endDate: { $lte: end, $gte: start } },
    ],
  });
  if (isLeaveExistOnEnterDate) {
    throw new ApiError(401, "A leave is already placed on these dates");
  }

  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  if (duration > leaveType.duration) {
    throw new ApiError(
      401,
      `duration exceede according to your current leave plan you max duration is ${leaveType.duration} and you are now requesting for this ${duration}`
    );
  }

  // Create leave
  const leave = await Leave.create({
    empName: req.employee,
    duration,
    startDate: start,
    endDate: end,
    resumptionDate: resumption,
    Type: leaveType._id,
  });

  if (!leave) {
    throw new ApiError(401, "Something went wrong while creating the leave");
  }
  
  console.log("leave",leave.empName.company)

  const HrResult = await HR.aggregate([
    {
      '$match': {
        'company': leave.empName.company
      }
    },
    {
      '$project': {
        '_id': 1
      }
    }
  ]);

  console.log(HrResult)


  if (!HrResult || HrResult.length === 0) {
    throw new Error("HR not found for the specified company.");
  }

  const HrId = HrResult[0]._id;

  await HR.findByIdAndUpdate(HrId, {
    $push: {
      notifications: {
        message: `${leave.empName.name}' has requested leave.`,
        date: leave.createdAt
      }
    }
  });


  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Leave created successfully"));
});

export const updateLeave = asyncHandler(async (req, res) => {
  const { startDate, endDate, resumptionDate, type } = req.body;
  const { leaveId } = req.params;

  if (!isValidObjectId(leaveId)) {
    throw new ApiError(401, "invalid id");
  }
  const isLeaveExist = await Leave.findById(leaveId);
  if (!isLeaveExist) {
    throw new ApiError(401, "Leave not found");
  }
  if (isLeaveExist.status) {
    throw new ApiError(
      401,
      "Your leave is already approved you can't modify it you can asked you HR deapartment to first cancel the approved"
    );
  }

  // Validate all required fields
  if (!startDate || !endDate || !resumptionDate || !type) {
    throw new ApiError(401, "All fields are required");
  }
  // Convert strings to Date objects for comparison
  const start = new Date(startDate);
  const end = new Date(endDate);
  const resumption = new Date(resumptionDate);

  if (start >= end) {
    throw new ApiError(401, "End date must be after start date");
  }
  if (end >= resumption) {
    throw new ApiError(401, "Resumption date must be after end date");
  }

  // Check if leave type exists
  const leaveType = await LeaveType.findOne({ leaveplan: type });
  if (!leaveType) {
    throw new ApiError(401, "This type of leave plan does not exist");
  }

  // Check if a leave already exists on any of the dates
  const isLeaveExistOnEnterDate = await Leave.findOne({
    $or: [
      { startDate: { $lte: end, $gte: start } },
      { endDate: { $lte: end, $gte: start } },
    ],
  });
  if (isLeaveExistOnEnterDate) {
    throw new ApiError(401, "A leave is already placed on these dates");
  }

  const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

  if (duration > leaveType.duration) {
    throw new ApiError(
      401,
      `duration exceede according to your current leave plan you max duration is ${leaveType.duration} and you are now requesting for this ${duration}`
    );
  }

  // Create leave
  const leave = await Leave.findByIdAndUpdate(
    leaveId,
    {
      duration,
      startDate: start,
      endDate: end,
      resumptionDate: resumption,
      Type: leaveType._id,
    },
    { new: true }
  );

  if (!leave) {
    throw new ApiError(401, "Something went wrong while updating the leave");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Leave updated successfully"));
});

export const getEmployeeLeaves = asyncHandler(async (req, res) => {
  const leave = await Leave.aggregate([
    {
      $match: {
        empName: req.employee._id
      }
    },
    {
      $lookup: {
        from: "employees",
        localField: "empName",
        foreignField: "_id",
        as: "empName",
        pipeline: [
          {
            $project: {
              name: 1,
            },
          },
        ],
      },
    },{$unwind:"$empName"},
    {
      $lookup: {
        from: "leavetypes",
        localField: "Type",
        foreignField: "_id",
        as: "leavePlan",
        pipeline: [
          {
            $project: {
              leaveplan: 1,
              reason: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$leavePlan",
    },
    {
      $project: {
        empName: "$empName.name",
        startDate: 1,
        endDate: 1,
        duration: 1,
        leaveplan: "$leavePlan.leaveplan",
        reason: "$leavePlan.reason",
        status:1
      },
    },
  ]);

  if (!leave || leave.length === 0) {
    throw new ApiError(404, "No leaves found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Leaves fetched successfully"));
});

// ---  get all leaves admin side ---
export const getallLeaves = asyncHandler(async (req, res) => {
  // const leave = await Leave.find()
  const leave = await Leave.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "empName",
        foreignField: "_id",
        as: "empName",
        pipeline: [
          {
            $project: {
              name: 1,
              company: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$empName" },
    {
      $match: {
        "empName.company": req.hr.company,
      },
    },
    {
      $lookup: {
        from: "leavetypes",
        localField: "Type",
        foreignField: "_id",
        as: "leavePlan",
        pipeline: [
          {
            $project: {
              leaveplan: 1,
              reason: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$leavePlan" },
    {
      $project: {
        empName: "$empName.name",
        startDate: 1,
        endDate: 1,
        duration: 1,
        leaveplan: "$leavePlan.leaveplan",
        reason: "$leavePlan.reason",
        status: 1,
      },
    },
  ]);
  
  
  if (!leave) {
    throw new ApiError(401, "Something went wrong while fetching the leaves");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, leave, "leaves fetch successfully"));
});

export const toggleLeaveStatus = asyncHandler(async (req, res) => {
  const { leaveId } = req.params;
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  if (!isValidObjectId(leaveId)) {
    throw new ApiError(400, "Invalid leave ID");
  }

  const leave = await Leave.findById(leaveId);
  if (!leave) {
    throw new ApiError(404, "Leave not found");
  }

  const updateLeave = await Leave.findByIdAndUpdate(
    leaveId,
    {
      $set: {
        status: status,
      },
    },
    { new: true }
  );

  const empId = updateLeave.empName.toString()
  const employee = await Employee.findById(empId)
  await Employee.findByIdAndUpdate(employee._id, {
    $push: {
      notifications: {
        message: `${employee.name}, Your leave request has been ${updateLeave.status}.`,
        date: updateLeave.updatedAt
      }
    }
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updateLeave, "Status changed successfully"));
});