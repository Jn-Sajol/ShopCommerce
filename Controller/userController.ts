import type { Request, Response } from "express";
import { prisma } from "../Db/db.config";
import { getUserByEmail, postCreateUser } from "./user.service";
import { StatusCodes } from "http-status-codes";
import { compare, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
export const userRegistration = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      throw new Error("email and name is required");
    }
    const checkDuplicate = await getUserByEmail(email);
    if (checkDuplicate) {
      throw new Error("already user exist by this email");
    }
    const newUser = await postCreateUser({
      name,
      email,
      password: hashSync(password, 10),
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User has created",
      data: newUser,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error && error.message ? error.message : "server error",
    });
  }
};

//user Login
export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      throw new Error("email and name is required");
    }
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User not Found");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Credential");
    }

    const token = jwt.sign({ user_id: user.id }, "secretkey",{expiresIn:'24h'});
    res.status(StatusCodes.OK).json({
      success: true,
      message: "User Login Successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });

  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error && error.message ? error.message : "server error",
    });
  }
};

