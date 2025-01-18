import { Request, Response } from "express";
import { prisma } from "../Db/db.config";

const userRegistration = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const checkDuplicate = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkDuplicate) {
      return res.status(400).json({
        success: false,
        message: "already user exist by this email",
      });
    }
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    res.send({ "user created": newUser });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: error,
    });
  }
};

//user Login
const userLogin = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

//User Update
const userUpdated = async (req: Request, res: Response) => {
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
    const {id} = req.params;
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
        comments:true
      },
    });
    res.send(allUser);
  } catch (error) {}
};

module.exports = {
  userRegistration,
  userLogin,
  userUpdated,
  userDelete,
  allUser,
};
