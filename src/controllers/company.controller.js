import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/apiError.js";
import ApiResponse from "../utility/apiResponse.js";
import { Company } from "../models/company.model.js";
import { isValidObjectId } from "mongoose";
import { HR } from "../models/hr.model.js";

export const registerCompany = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(400, "Company name is required.");
  }

  const isCompanyExist = await Company.findOne({ name });
  if (isCompanyExist) {
    throw new ApiError(409, "A company with this name already exists.");
  }

  const isCompanyExistByAdmins = await Company.findOne({ Admins: req.hr._id });
  if (isCompanyExistByAdmins) {
    throw new ApiError(409, "Something went wrong: company is already registered with this HR");
  }

  const company = await Company.create({
    name,
    Admins: req.hr ? [req.hr._id] : [],
  });

  // Check if the company creation failed
  if (!company) {
    throw new ApiError(500, "An error occurred while registering the company.");
  }

  const updatedHR = await HR.findByIdAndUpdate(
    req.hr?._id,
    {
      $set: {
        company: company._id,
      },
    },
    { new: true }
  );

  if (!updatedHR) {
    throw new ApiError(500, "An error occurred while updating HR information.");
  }

  // Respond with success
  return res
    .status(201)
    .json(new ApiResponse(201, company, "Company registered successfully."));
});

export const getCompany = asyncHandler(async (req, res, next) => {
  try {
    const company = await Company.findOne({ Admins: [req.hr._id] });
    
    if (!company) {
      return next(new ApiError(404, "Company not found"));
    }
    
    res.status(200).json({
      status: 200,
      data: company,
      message: "Company details fetched successfully"
    });
  } catch (error) {
    next(new ApiError(500, "Something went wrong while fetching company details"));
  }
});


export const updateCompanyName = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { companyId } = req.params;
  if (!name) {
    throw new ApiError(401, "Name is required");
  }
  if (!isValidObjectId(companyId)) {
    throw new ApiError(401, "Invalid Id");
  }
  const isCompanyExist = await Company.findById(companyId);
  if (!isCompanyExist) {
    throw new ApiError(401, "Company not found");
  }
  const company = await Company.findByIdAndUpdate(
    isCompanyExist._id,
    {
      name,
    },
    { new: true }
  );
  if (!company) {
    throw new ApiError(401, "Something went wrong while register the company");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, company, "Comapny Name updated Successfully"));
});

export const getAllEmployees = asyncHandler(async (req, res) => {
  try {
    // Fetch the company details including employees where the current HR is an admin
    const company = await Company.findOne({ Admins: req.hr._id }).select('employees');

    if (!company) {
      return res.status(404).json(new ApiResponse(404, null, "Company not found"));
    }

    // Aggregate employee details from employee IDs
    const allCompanyEmployees = await Company.aggregate([
      { $match: { _id: company._id } },
      { 
        $lookup: {
          from: "employees",
          localField: "employees",
          foreignField: "_id",
          as: "EmployeeDetails",
          pipeline: [
            {
              $project: {
                name: 1,
                email: 1,
                phoneNumber: 1,
                department: 1,
                jobtitle: 1,
                jobcategory: 1,
                gender: 1,
                startdate: 1
              }
            }
          ]
        }
      },
      {
        $project: {
          EmployeeDetails: 1,
        }
      },
      {
        $unwind:"$EmployeeDetails"
      }
    ],[{
      $setField:{
        $first:"$EmployeeDetails"
      }
    }]);

    return res.status(200).json(new ApiResponse(200, allCompanyEmployees, "Employees fetched successfully"));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
});

export const getDashboardData = asyncHandler(async (req, res) => {
  try {
    // Find the company
    const company = await Company.findOne({ Admins: req.hr._id }).select('_id name');

    if (!company) {
      return res.status(404).json(new ApiResponse(404, null, "Company not found"));
    }

    const data = await Company.aggregate([
      {
        '$match': {
          '_id': company._id
        }
      },
      {
        '$lookup': {
          'as': 'employees',
          'from': 'employees',
          'foreignField': '_id',
          'localField': 'employees'
        }
      },
      {
        '$lookup': {
          'as': 'targets',
          'from': 'targets',
          'foreignField': '_id',
          'localField': 'targets'
        }
      },
      {
        '$addFields': {
          'employeeCount': { '$size': '$employees' },
          'targetCount': { '$size': '$targets' },
          'genderCount': {
            '$arrayToObject': {
              '$map': {
                'input': ['Male', 'Female'],
                'as': 'gender',
                'in': {
                  'k': '$$gender',
                  'v': {
                    '$size': {
                      '$filter': {
                        'input': '$employees',
                        'as': 'employee',
                        'cond': { '$eq': ['$$employee.gender', '$$gender'] }
                      }
                    }
                  }
                }
              }
            }
          },
          'jobGroups': {
            '$arrayToObject': {
              '$map': {
                'input': '$employees.jobtitle',
                'as': 'jobGroup',
                'in': {
                  'k': '$$jobGroup',
                  'v': {
                    '$size': {
                      '$filter': {
                        'input': '$employees',
                        'as': 'employee',
                        'cond': { '$eq': ['$$employee.jobtitle', '$$jobGroup'] }
                      }
                    }
                  }
                }
              }
            }
          },
          'performance': {
            '$cond': {
              'if': { '$eq': [{ '$sum': '$employees.totalKpiScore' }, 0] },
              'then': 0,
              'else': {
                '$divide': [
                  { '$sum': '$employees.totalKpiWeight' },
                  { '$sum': '$employees.totalKpiScore' }
                ]
              }
            }
          }
        }
      },
      {
        '$project': {
          '_id': 1,
          'name': 1,
          'genderCount': 1,
          'targetCount': 1,
          'targets': 1,
          'employeeCount': 1,
          'employees': 1,
          'jobGroups': 1,
          'performance': 1
        }
      }
    ]);
    

    return res.status(200).json(new ApiResponse(200, data, "Data fetched successfully"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, null, "An error occurred while fetching dashboard data"));
  }
});


