import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/apiError.js";
import ApiResponse from "../utility/apiResponse.js";
import { Employee } from "../models/employee.model.js";
import { Company } from "../models/company.model.js";
import { isValidObjectId } from "mongoose";
import { uploadOnCloudinary } from "../utility/Cloudinary.js";
import jwt from "jsonwebtoken";
import { HR } from "../models/hr.model.js";
import { ObjectId } from "mongoose";

const genreteAccessAndRefreshToken = async (id) => {
  try {
    const employee = await Employee.findById(id);
    const refreshToken = employee.genereteRefreshToken();
    const accessToken = employee.genereteAccessToken();

    employee.refreshToken = refreshToken;
    await employee.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (err) {
    throw new ApiError(
      401,
      "Something went wrong while genereting Access and Refresh Token"
    );
  }
};

export const registerEmployee = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, reTypePassword, companyCode } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !reTypePassword ||
    !companyCode
  ) {
    throw new ApiError(401, "All fields are required.");
  }

  if (!isValidObjectId(companyCode)) {
      throw new ApiError(401, "Invalid company code. Please contact the admin team for the correct code.");
  }

  if (password !== reTypePassword) {
    throw new ApiError(401, "Passwords do not match.");
  }

  const isCompanyExist = await Company.findById(companyCode);
  if (!isCompanyExist) {
    throw new ApiError(
      401,
      "Company not found. Please contact the admin team for the correct code."
    );
  }

  const isEmployeeExist = await Employee.findOne({ email });
  if (isEmployeeExist) {
    throw new ApiError(401, "An account with this email already exists.");
  }

  const employee = await Employee.create({
    name: `${firstName} ${lastName}`,
    email,
    password,
    company: isCompanyExist._id,
  });

  if (!employee) {
    throw new ApiError(500, "An error occurred while creating the account.");
  }

  const company = await Company.findByIdAndUpdate(isCompanyExist._id, {
    $push: { employees: employee._id },
  });


  const HrResult = await HR.aggregate([
    {
      '$match': {
        'company': company._id 
      }
    },
    {
      '$project': {
        '_id': 1
      }
    }
  ]);


  if (!HrResult || HrResult.length === 0) {
    throw new Error("HR not found for the specified company.");
  }

  const HrId = HrResult[0]._id;

  await HR.findByIdAndUpdate(HrId, {
    $push: {
      notifications: {
        message: `${employee.name} created an account`,
        date: employee.createdAt
      }
    }
  });

  return res
    .status(200)
    .json(new ApiResponse(200, employee, "Account created successfully."));
});

export const loginEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ((!email, !password)) {
    throw new ApiError(401, "Fields are required");
  }
  const employee = await Employee.findOne({ email });
  if (!employee) {
    throw new ApiError(401, "Account is not found");
  }
  const isPasswordCorrect = await employee.isPassowrdCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Password is not correct");
  }
  const newEmployee = await Employee.findById(employee._id).select(
    "-password -refreshToken"
  );
  if (!newEmployee) {
    throw new ApiError(401, "Something went wrong while fetching details");
  }
  const { accessToken, refreshToken } = await genreteAccessAndRefreshToken(
    newEmployee._id
  );
  if ((!accessToken, !refreshToken)) {
    throw new ApiError(401, "Access and Refresh Token not found");
  }

  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const currEmployee = await Employee.findById(decodedToken?.id).select(
    "-refreshToken"
  );

  if (!currEmployee) {
    throw new ApiError(403, "Invalid access token. Employee not found.");
  }

  req.employee = employee;

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: 'None'
  };
  return res
    .status(200)
    .cookie("empAccessToken", accessToken, options)
    .cookie("empRefreshToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { newEmployee, accessToken, accessToken },
        "Login Success"
      )
    );
});

export const logoutEmployee = asyncHandler(async (req, res) => {
  // get employee._id from middleware
  await Employee.findByIdAndUpdate(
    req.employee?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: 'None'
  };
  return res
    .status(200)
    .clearCookie("empAccessToken", options)
    .clearCookie("empRefreshToken", options)
    .json(new ApiResponse(200, {}, "Logout Successfully"));
});

export const currentEmployee = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.employee, "Employee fetch successful"));
});

export const updateProfileEmployee = asyncHandler(async (req, res) => {
  // phoneNumber,avatar,password,department,jobtitle,jobcategory,gender,startdate
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    department,
    jobtitle,
    jobcategory,
    gender,
    startdate,
  } = req.body;

  const newEmployee = await Employee.findByIdAndUpdate(
    req.employee?._id,
    {
      name: firstName + " " + lastName,
      email,
      phoneNumber,
      department,
      jobtitle,
      jobcategory,
      gender,
      startdate,
    },
    { new: true }
  );

  const HrResult = await HR.aggregate([
    {
      '$match': {
        'company': newEmployee.company
      }
    },
    {
      '$project': {
        '_id': 1
      }
    }
  ]);


  if (!HrResult || HrResult.length === 0) {
    throw new Error("HR not found for the specified company.");
  }

  const HrId = HrResult[0]._id;

  await HR.findByIdAndUpdate(HrId, {
    $push: {
      notifications: {
        message: `${newEmployee.name}'s account has just been updated.`,
        date: newEmployee.createdAt
      }
    }
  });

  
  if (!newEmployee) {
    throw new ApiError(401, "Something went wrong while updating the profile");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, newEmployee, "Account updated successfully"));
});

export const getSingleEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  if (!isValidObjectId(employeeId)) {
    return res.status(400).json(new ApiError(400, "Invalid ID format"));
  }

  const employee = await Employee.findById(employeeId).select(
    "-refreshToken -password"
  );

  if (!employee) {
    return res.status(404).json(new ApiError(404, "Employee not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, employee, "Employee fetch successful"));
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  if (!isValidObjectId(employeeId)) {
    return res.status(400).json(new ApiError(400, "Invalid ID format"));
  }

  const employee = await Employee.findById(employeeId);

  if (!employee) {
    return res.status(404).json(new ApiError(404, "Employee not found"));
  }

  // Delete the employee
  await Employee.findByIdAndDelete(employeeId);

  // Remove the employee ID from the company's employees array
  const company = await Company.findByIdAndUpdate(
    employee.company,
    { $pull: { employees: employeeId } },
    { new: true }
  );

  const HrResult = await HR.aggregate([
    {
      '$match': {
        'company': company._id 
      }
    },
    {
      '$project': {
        '_id': 1
      }
    }
  ]);


  if (!HrResult || HrResult.length === 0) {
    throw new Error("HR not found for the specified company.");
  }

  const HrId = HrResult[0]._id;

  await HR.findByIdAndUpdate(HrId, {
    $push: {
      notifications: {
        message: `${employee.name}'s account was deleted.`,
        date: employee.updatedAt
      }
    }
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Employee deleted successfully"));
});

export const updateEmployeeInfo = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  if (!isValidObjectId(employeeId)) {
    return res.status(400).json(new ApiError(400, "Invalid ID format"));
  }

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    department,
    jobtitle,
    jobcategory,
    gender,
    startdate,
  } = req.body;

  const employee = await Employee.findById(employeeId).select(
    "-refreshToken -password"
  );

  if (!employee) {
    return res.status(404).json(new ApiError(404, "Employee not found"));
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(
    employeeId,
    {
      name: firstName + " " + lastName,
      email,
      phoneNumber,
      department,
      jobtitle,
      jobcategory,
      gender,
      startdate,
    },
    { new: true }
  );

  if (!updatedEmployee) {
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while updating the profile")
      );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedEmployee, "Employee updated successfully")
    );
});

export const updateProfileEmp = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req.body;

  // Validate request body fields
  if (!name || !email || !phoneNumber) {
    throw new ApiError(400, "All fields (name, email, phoneNumber) are required");
  }

  // Update HR profile
  const newEmp = await Employee.findByIdAndUpdate(
    req.employee?._id,
    { name, email, phoneNumber },
    { new: true }
  );

  // Check if update was successful
  if (!newEmp) {
    throw new ApiError(500, "An error occurred while updating the profile");
  }

  // Respond with success
  return res.status(200).json(
    new ApiResponse(200, newEmp, "Account updated successfully")
  );
});

export const updateAvatarEmployee = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path
  if (!avatarLocalPath) {
      throw new ApiError(401, "Avatar not found");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  if (!avatar) {
      throw new ApiError(401, "Error while upload avatar on cloud");
  }

  const newEmp = await Employee.findByIdAndUpdate(
    req.employee?._id,
    {
      avatar:avatar?.url
    },
    { new: true }
  );
  if (!newEmp) {
    throw new ApiError(401, "Something went wrong while uploadin the avatar");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, newEmp, "Avatar upload successfully"));
});

export const getEmployeeDashboard = asyncHandler(async (req, res) => {

  try{
const data = await Employee.aggregate([
    {
      '$match': {
        '_id': req.employee._id
      }
    }, {
      '$lookup': {
        'from': 'targets', 
        'localField': 'targets', 
        'foreignField': '_id', 
        'as': 'targets'
      }
    }, {
      '$lookup': {
        'from': 'leaves', 
        'localField': '_id', 
        'foreignField': 'empName', 
        'as': 'leaves'
      }
    },
    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "company"
      }
    },
    {
      $set: {
        company:{ $first: "$company" }
      }
    },
    {
      '$addFields': {
        'performance': {
          '$multiply': [
            {
              '$divide': [
                '$totalKpiScore', '$totalKpiWeight'
              ]
            }, 100
          ]
        }, 
        'targetCount': {
          '$size': {
            '$ifNull': [
              '$targets', []
            ]
          }
        }, 
        'leaveCount': {
          '$size': {
            '$ifNull': [
              '$leaves', []
            ]
          }
        }, 
        'completeTargets': {
          '$size': {
            '$filter': {
              'input': {
                '$ifNull': [
                  '$targets', []
                ]
              }, 
              'as': 'target', 
              'cond': {
                '$eq': [
                  '$$target.marking', true
                ]
              }
            }
          }
        }, 
        'totalLeaves': {
          '$sum': {
            '$map': {
              'input': {
                '$ifNull': [
                  '$leaves', []
                ]
              }, 
              'as': 'leave', 
              'in': '$$leave.duration'
            }
          }
        }
      }
    }
  ])
  return res.status(200).json(new ApiResponse(200, data, "Data fetched successfully"));
}
   catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, null, "An error occurred while fetching dashboard data"));
  }
});