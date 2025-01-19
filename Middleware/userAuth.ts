import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes"; // Import status codes

// Middleware for user authentication
const userAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get token from Authorization header
    const tokenFromHeader = req.headers.authorization;

    if (!tokenFromHeader) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Authorization header not sent",
      });
      return;
    }

    // Split token (Bearer <token>)
    const splitToken = tokenFromHeader.split(" ")[1];

    if (!splitToken) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Token not found in Authorization header",
      });
      return;
    }

    // Verify token
    const secretKey = process.env.JWT_SECRET || "your_default_secret_key"; // Use an environment variable for security
    const verifyToken = jwt.verify(splitToken, secretKey) as JwtPayload; // Type the result as JwtPayload

    if (!verifyToken) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    // Attach user info to the request
    req.user = verifyToken;

    // Proceed to the next middleware/route handler
    next();
  } catch (error: any) {
    console.error("JWT verification error:", error.message);

    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    if (error.name === "TokenExpiredError") {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Token has expired",
      });
      return;
    }

    // Generic error response for other errors
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { userAuth };
