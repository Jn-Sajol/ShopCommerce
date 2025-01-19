// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError"; // Import the CustomError interface

export function errorHandler(
  err: CustomError,  // Type the error parameter to be CustomError
  req: Request,
  res: Response,
  next: NextFunction
) {
  // If the error has a statusCode, we send it back in the response
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Generic error response
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
