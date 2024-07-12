import jwt from "jsonwebtoken";
import ApiError from "../utility/apiError.js";
import { HR } from "../models/hr.model.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.error("Unauthorized request. Token is missing.");
      return next(new ApiError(401, "Unauthorized request. Token is missing."));
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return next(new ApiError(403, "Invalid access token."));
    }

    const hr = await HR.findById(decodedToken?.id).select("-refreshToken");
    if (!hr) {
      console.error("Invalid access token. HR not found.");
      return next(new ApiError(403, "Invalid access token. HR not found."));
    }

    req.hr = hr;
    next();
  } catch (error) {
    console.error("Error in verifyJwt middleware:", error.message);
    next(new ApiError(500, "Internal server error."));
  }
};


export const verifyEmployee = async (req, res, next) => {
  try {
    const token = req.cookies?.empAccessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.error("Unauthorized request. Token is missing.");
      return next(new ApiError(401, "Unauthorized request. Token is missing."));
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      console.error("Token verification failed:", err.message);
      return next(new ApiError(403, "Invalid access token."));
    }

    const employee = await Employee.findById(decodedToken?.id).select("-refreshToken");
    if (!employee) {
      console.error("Invalid access token. Employee not found.");
      return next(new ApiError(403, "Invalid access token. Employee not found."));
    }

    req.employee = employee;
    next();
  } catch (error) {
    console.error("Error in verifyEmployee middleware:", error.message);
    next(new ApiError(500, "Internal server error."));
  }
};
