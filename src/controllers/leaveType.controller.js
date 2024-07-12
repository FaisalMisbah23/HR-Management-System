import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/apiError.js";
import ApiResponse from "../utility/apiResponse.js";
import { LeaveType } from "../models/LeaveType.model.js";
import { isValidObjectId } from "mongoose";

export const createLeaveType = asyncHandler(async (req, res) => {
  const { leaveplan, duration, recall, reason } = req.body;

  if (!leaveplan || !duration || !reason) {
    throw new ApiError(400, "All fields are required");
  }

  const isLeavePlanExist = await LeaveType.findOne({ leaveplan });

  if (isLeavePlanExist) {
    throw new ApiError(409, "This leave plan already exists");
  }

  const leavePlan = await LeaveType.create({
    leaveplan,
    duration,
    recall,
    reason,
  });

  if (!leavePlan) {
    throw new ApiError(500, "Something went wrong while creating the leave plan");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, leavePlan, "Leave plan created successfully"));
});

export const deleteLeaveType = asyncHandler(async (req, res) => {
  const { leavePlanId } = req.params;

  if (!isValidObjectId(leavePlanId)) {
    throw new ApiError(400, "Invalid ID format");
  }

  const isLeavePlanExist = await LeaveType.findById(leavePlanId);

  if (!isLeavePlanExist) {
    throw new ApiError(404, "Leave plan not found");
  }

  await LeaveType.findByIdAndDelete(isLeavePlanExist._id);

  return res.status(200).json(new ApiResponse(200, {}, "Leave plan deleted successfully"));
});

export const updatedLeaveType = asyncHandler(async (req, res) => {
  const { leaveplan, duration, recall, reason } = req.body;
  const { leavePlanId } = req.params;

  // Check for a valid ObjectId
  if (!isValidObjectId(leavePlanId)) {
    throw new ApiError(400, "Invalid ID format");
  }

  // Check for required fields
  if (!leaveplan || !duration || !reason) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if leave plan exists
  const isLeavePlanExist = await LeaveType.findById(leavePlanId);
  if (!isLeavePlanExist) {
    throw new ApiError(404, "Leave plan not found");
  }

  // Update the leave plan
  const leavePlan = await LeaveType.findByIdAndUpdate(
    leavePlanId,
    {
      $set: { leaveplan, duration, recall, reason },
    },
    { new: true }
  );

  // Check if the update was successful
  if (!leavePlan) {
    throw new ApiError(500, "Error updating leave plan");
  }

  // Return the updated leave plan
  return res
    .status(200)
    .json(new ApiResponse(200, leavePlan, "Leave plan updated successfully"));
});


export const getLeaveTypes = asyncHandler(async (req, res) => {
  try {
    const leaveTypes = await LeaveType.find();
    if (!leaveTypes) {
      throw new ApiError(
        404,
        "No leave types found"
      );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, leaveTypes, "Leave types fetched successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Something went wrong while fetching the leave types"));
  }
});

