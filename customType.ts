import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // This will type `req.user` as a JwtPayload or undefined
    }
  }
}
