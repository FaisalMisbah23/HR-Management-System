import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/apiError.js";
import ApiResponse from "../utility/apiResponse.js";
import { HR } from "../models/hr.model.js";
import { Company } from "../models/company.model.js";
import { uploadOnCloudinary } from "../utility/Cloudinary.js";

const generateAccessAndRefreshToken = async (id) => {
  try {
    const Hr = await HR.findById(id);
    const refreshToken = Hr.genereteRefreshToken();
    const accessToken = Hr.genereteAccessToken();

    Hr.refreshToken = refreshToken;
    await Hr.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (err) {
    throw new ApiError(
      401,
      "Something went wrong while genereting Access and Refresh Token"
    );
  }
};

export const registerHr = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, reTypePassword, phoneNumber } =
    req.body;

  // Check if all required fields are provided
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !reTypePassword ||
    !phoneNumber
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if passwords match
  if (password !== reTypePassword) {
    throw new ApiError(400, "Passwords do not match");
  }

  // Check if HR already exists
  const isHrExists = await HR.findOne({ email });
  if (isHrExists) {
    throw new ApiError(409, "Account already exists");
  }

  // Create new HR
  const newHr = await HR.create({
    name: `${firstName} ${lastName}`,
    email,
    phoneNumber,
    password,
  });

  // Check if HR creation was successful
  if (!newHr) {
    throw new ApiError(
      500,
      "Something went wrong while creating the new account"
    );
  }

  // Return success response
  return res
    .status(201)
    .json(new ApiResponse(201, newHr, "Account created successfully"));
});

export const loginHr = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find HR by email
  const hr = await HR.findOne({ email });
  if (!hr) {
    throw new ApiError(404, "Account not found");
  }

  // Check if the password is correct
  const isPasswordCorrect = await hr.checkCorrectPassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Incorrect password");
  }

  // Fetch HR details without password and refresh token
  const newHr = await HR.findById(hr._id).select("-password -refreshToken");
  if (!newHr) {
    throw new ApiError(500, "Something went wrong while fetching details");
  }

  // Generate access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    newHr._id
  );
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Failed to generate access and refresh tokens");
  }

  // Set cookie options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: 'None'
  };

  // Return success response with tokens and HR details
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { newHr, accessToken, refreshToken },
        "Login successful"
      )
  );
});

export const logoutHr = asyncHandler(async (req, res) => {
  // get Hr._id from middleware
  await HR.findByIdAndUpdate(
    req.hr?._id,
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
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logout Successfully"));
});

export const updateProfileHr = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber } = req.body;

  // Validate request body fields
  if (!name || !email || !phoneNumber) {
    throw new ApiError(400, "All fields (name, email, phoneNumber) are required");
  }

  // Update HR profile
  const newHr = await HR.findByIdAndUpdate(
    req.hr?._id,
    { name, email, phoneNumber },
    { new: true }
  );

  // Check if update was successful
  if (!newHr) {
    throw new ApiError(500, "An error occurred while updating the profile");
  }

  // Respond with success
  return res.status(200).json(
    new ApiResponse(200, newHr, "Account updated successfully")
  );
});

export const updateAvatarHr = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path
  if (!avatarLocalPath) {
      throw new ApiError(401, "Avatar not found");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  if (!avatar) {
      throw new ApiError(401, "Error while upload avatar on cloud");
  }

  const newHr = await HR.findByIdAndUpdate(
    req.hr?._id,
    {
      avatar:avatar?.url
    },
    { new: true }
  );
  if (!newHr) {
    throw new ApiError(401, "Something went wrong while uploadin the avatar");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, newHr, "Avatar upload successfully"));
});

export const getCurrentHr = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(new ApiResponse(200, req.hr, "HR fetch success"));
});


// for getting landing page stats
export const getLandingPageData = asyncHandler(async (req, res) => {
  try {
    const data = await Company.aggregate([
      {
        '$group': {
          '_id': null, 
          'totalEmployees': {
            '$sum': {
              '$size': '$employees'
            }
          }, 
          'totalHRs': {
            '$sum': {
              '$size': '$Admins'
            }
          }, 
          'totalCompanies': {
            '$sum': 1
          }
        }
      }
    ]);

    return res.status(200).json(new ApiResponse(200, data, "Data fetched successfully"));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, null, "An error occurred while fetching data"));
  }
});
