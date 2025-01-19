import express from "express";
import { userLogin, userRegistration } from "../Controller/userController";

export const userRouter = express.Router();
userRouter.post("/register",  userRegistration);
userRouter.put("/login",  userLogin);


