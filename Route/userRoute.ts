import express from "express";
import { me, userLogin, userRegistration } from "../Controller/userController";
import { isAdminAuth, userAuth } from "../Middleware/userAuth";

export const userRouter = express.Router();
userRouter.post("/register", userRegistration);
userRouter.put("/login", userLogin);
userRouter.get("/me", [userAuth,isAdminAuth], me);
