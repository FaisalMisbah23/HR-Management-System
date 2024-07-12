import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/apiError.js";
import ApiResponse from "../utility/apiResponse.js";
import { Employee } from "../models/employee.model.js";
import { Target } from "../models/Target.model.js";
import { isValidObjectId } from "mongoose";
import { Company } from "../models/company.model.js";

export const createTarget = asyncHandler(async (req, res) => {
  const { title, kpiweight, empname, startdate, enddate } = req.body;

  // Check for missing fields
  if (!title || !kpiweight || !empname || !startdate || !enddate) {
    throw new ApiError(400, "All fields are required.");
  }

  // Check if the employee exists
  const isEmployeeExist = await Employee.findOne({ name: empname });
  if (!isEmployeeExist) {
    throw new ApiError(404, "Employee not found.");
  }

  // Validate dates
  const start = new Date(startdate);
  const end = new Date(enddate);
  if (isNaN(start) || isNaN(end)) {
    throw new ApiError(400, "Dates are not valid. Use the format mm/dd/yyyy.");
  }

  // Check date logic
  if (start >= end) {
    throw new ApiError(400, "End date must be after the start date.");
  }

  // Create the target
  const target = await Target.create({
    title,
    kpiweight,
    empname,
    startdate: start,
    enddate: end,
  });

  try {
    const isCompanyExist = await Company.findOne({ Admins: req.hr._id })
    if (!isCompanyExist) {
      throw new ApiError(401, "Company not found")
    }
    await isCompanyExist.updateOne({
      $push: { targets: target._id },
    });
  } catch (error) {
    throw new ApiError(500, "An error occurred while updating the Company targets.");
  }

  const employee = await Employee.findOne({name:empname})

  await Employee.findByIdAndUpdate(employee._id, {
    $push: {
      notifications: {
        message: `${employee.name}, You have been assigned a new target.`,
        date: target.createdAt
      }
    }
  });



  // Update the employee's total KPI weight
  try {
    isEmployeeExist.totalKpiWeight += target.kpiweight;
    isEmployeeExist.targets=isEmployeeExist.targets.push(target)
    await isEmployeeExist.save({ validateBeforeSave: false });
  } catch (error) {
    throw new ApiError(500, "An error occurred while updating the KPI weight.");
  }

  // Respond with success
  res
    .status(201)
    .json(new ApiResponse(201, target, "Target created successfully."));
});

export const updateTarget = asyncHandler(async (req, res) => {
  const { title, kpiweight, empname, startdate, enddate } = req.body;
  const { targetId } = req.params;
  if (!title || !kpiweight || !empname || !startdate || !enddate) {
    throw new ApiError(401, "FIelds are required");
  }
  if (!isValidObjectId(targetId)) {
    throw new ApiError(401, "invalid id");
  }
  const isTargetExist = await Target.findById(targetId);
  if (!isTargetExist) {
    throw new ApiError(401, "Target not found");
  }
  const isEmployeeExist = await Employee.findOne({ name: empname });
  if (!isEmployeeExist) {
    throw new ApiError(401, "Employee not found");
  }
  const start = new Date(startdate);
  const end = new Date(enddate);
  if (!start || !end) {
    throw new ApiError(
      401,
      "Date are not valid write in this format mm/dd/yyyy"
    );
  }
  if (start >= end) {
    throw new ApiError(401, "End date must be come after the start date");
  }
  const target = await Target.findByIdAndUpdate(
    isTargetExist,
    {
      $set: { title, kpiweight, empname, startdate: start, enddate: end },
    },
    { new: true }
  );

  const employee = await Employee.findOne({name:empname})

  await Employee.findByIdAndUpdate(employee._id, {
    $push: {
      notifications: {
        message: `${employee.name}, Your assigned target has been updated.`,
        date: target.updatedAt
      }
    }
  });



  try {
    isEmployeeExist.totalKpiWeight =
      isEmployeeExist.totalKpiWeight - isTargetExist.kpiweight;
    isEmployeeExist.totalKpiWeight =
      isEmployeeExist.totalKpiWeight + target.kpiweight;
    isEmployeeExist.save({ validateBeforeSave: false });
  } catch (error) {
    throw new ApiError(402, "Something went wrong while setting kpi weight");
  }

  res
    .status(200)
    .json(new ApiResponse(200, target, "Target updated successfully"));
});

export const deleteTarget = asyncHandler(async (req, res) => {
  const { targetId } = req.params;
  if (!isValidObjectId(targetId)) {
    throw new ApiError(401, "invalid id");
  }
  const isTargetExist = await Target.findById(targetId);
  if (!isTargetExist) {
    throw new ApiError(401, "Target not found");
  }
  const isEmployeeExist = await Employee.findOne({targets:targetId});
  if (!isEmployeeExist) {
    throw new ApiError(401, "Employee not found");
  }
  const target = await Target.findByIdAndDelete(isTargetExist._id);
  await Employee.findByIdAndUpdate(
    isEmployeeExist._id,
    { $pull: { targets: targetId },
     $push: {
      notifications: {
        message: `${isEmployeeExist.name}, Your assigned target has been deleted.`,
        date: target.updatedAt
      }
    }},
    { new: true }
  )


  try {
    const isCompanyExist = await Company.findOne({ Admins: req.hr._id })
    if (!isCompanyExist) {
      throw new ApiError(401, "Company not found")
    }
    await isCompanyExist.updateOne({
      $pull: { targets: isTargetExist._id },
    });
  } catch (error) {
    throw new ApiError(500, "An error occurred while deleting the Company targets.");
  }



  try {
    isEmployeeExist.totalKpiWeight =
      isEmployeeExist.totalKpiWeight - isTargetExist.kpiweight;
    isEmployeeExist.save({ validateBeforeSave: false });
  } catch (error) {
    throw new ApiError(402, "Something went wrong while setting kpi weight");
  }

  res.status(200).json(new ApiResponse(200, {}, "Target delete successfully"));
});

export const addKpiScore = asyncHandler(async (req, res) => {
  const { targetId } = req.params;

  // Validate the target ID
  if (!isValidObjectId(targetId)) {
    throw new ApiError(400, "Invalid ID format");
  }

  // Check if the target exists
  const target = await Target.findById(targetId);
  if (!target) {
    throw new ApiError(404, "Target not found");
  }

  // Check if the employee exists
  const employee = await Employee.findOne({ name: target.empname });
  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  // Check if the KPI score has already been given
  if (target.marking) {
    throw new ApiError(409, "KPI score has already been assigned to this target");
  }

  // Update the target to mark it as scored
  const updatedTarget = await Target.findByIdAndUpdate(target._id, { marking: true }, { new: true });


  await Employee.findByIdAndUpdate(employee._id, {
    $push: {
      notifications: {
        message: `${employee.name}, Your assigned target has been approved.`,
        date: updatedTarget.updatedAt
      }
    }
  });
  // Update the employee's total KPI score
  employee.totalKpiScore += target.kpiweight;
  await employee.save({ validateBeforeSave: false });

  // Respond with success
  return res.status(200).json(
    new ApiResponse(200, employee, "KPI score added to employee successfully")
  );
});

export const getTargets = asyncHandler(async (req, res) => {
  // const targets = await Target.find();
  const targets = await Company.aggregate([
    {
      '$match': {
        '_id': req.hr?.company
      }
    }, {
      '$lookup': {
        'as': 'targets', 
        'from': 'targets', 
        'foreignField': '_id', 
        'localField': 'targets'
      }
    }, {
      '$project': {
        'targets': 1
      }
    }
  ])

  if (!targets) {
    throw new ApiError(401, "Something went wrong while fetching the targets");
  }
  res
    .status(200)
    .json(new ApiResponse(200, targets, "Targets fetched successfully"));
});

export const getSingleTarget = asyncHandler(async (req, res) => {
  const { targetId } = req.params;

  // Validate the target ID
  if (!isValidObjectId(targetId)) {
    throw new ApiError(400, "Invalid ID format");
  }

  // Fetch the target by ID
  const target = await Target.findById(targetId);
  if (!target) {
    throw new ApiError(404, "Target not found");
  }

  // Respond with the target details
  return res.status(200).json(
    new ApiResponse(200, target, "Target fetched successfully")
  );
});

export const getEmployeeTargets = asyncHandler(async (req, res) => {
  const targets = await Target.find({empname:req.employee.name});
  if (!targets) {
    throw new ApiError(401, "Something went wrong while fetching the targets");
  }
  res
    .status(200)
    .json(new ApiResponse(200, targets, "Targets fetched successfully"));
});