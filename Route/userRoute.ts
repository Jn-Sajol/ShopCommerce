import express from "express";
import { userRegistration } from "../Controller/userController";

export const userRouter = express.Router();
userRouter.post("/register",  userRegistration);
userRouter.put("/update/:id",  userRegistration);

