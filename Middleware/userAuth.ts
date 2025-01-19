import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../Db/db.config";
;


export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
    const secretKey = process.env.JWT_SECRET || "secretkey"; // Use an environment variable for security
    const verifyToken = jwt.verify(splitToken, secretKey) as JwtPayload;

    if (!verifyToken || !verifyToken.user_id) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    // Fetch the user from the database using the user_id from the token
    const user = await prisma.user.findUnique({
      where: { id: verifyToken.user_id }, // Assuming your JWT has a `user_id`
    });

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    // Attach the user to the request object
    // if (user && user !== undefined) {
      req.user = user; // Here, req.user will be of type `User`
    // }

    // Proceed to the next middleware/route handler
    next();
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Admin AUthentication Check

export const isAdminAuth = async (req: Request, res: Response, next: NextFunction) => {
  
  if (req.user?.role !== 'ADMIN') {  
   res.send('you are not a admin')
   return
  }

  next();
};
