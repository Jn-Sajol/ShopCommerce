import type { Request, Response } from "express";
import { prisma } from "../Db/db.config";
import { getUserByEmail, postCreateUser } from "./user.service";
import { StatusCodes } from "http-status-codes";

export const userRegistration = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    if (!name && !email) {
      // res.status(StatusCodes.BAD_REQUEST).json({
      //   success: false,
      //   message: "Email and Name is Required",
      // });
      // return
      throw new Error('email and name is required')
    }
    const checkDuplicate = await getUserByEmail(email);
    if (checkDuplicate) {
      // res.status(StatusCodes.CONFLICT).json({
      //   success: false,
      //   message: "already user exist by this email",
      // });
      throw new Error('already user exist by this email')
    }
    const newUser = await postCreateUser({ name, email });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User has created",
      data: newUser,
      // error: error,
    });
  } catch (error: any) {
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error && error.message ? error.message : "server error",
      // error: error,
    });
  }
};

//user Login
const userLogin = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

//User Update
export const userUpdated = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const id = Number(req.params.id);
    const updated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
      },
    });
    res.send(updated);
  } catch (error) {
    res.send(error);
  }
};

//userDelete
const userDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(deleted);
  } catch (error) {
    res.send(error);
  }
};

//allUser
const allUser = async (req: Request, res: Response) => {
  try {
    const alluser = await prisma.user.findMany({
      include: {
        posts: true,
        comments: true,
      },
    });
    res.send(allUser);
  } catch (error) {}
};
