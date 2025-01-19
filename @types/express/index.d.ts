import { User} from "@prisma/client"; // Import User model type

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
