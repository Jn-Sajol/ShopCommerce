import { Request, Response } from "express";
import { prisma } from "../Db/db.config";
import { StatusCodes } from "http-status-codes";

//Product Create
export const productCreate = async (req: Request, res: Response) => {
  try {
    const { name, description, tag } = req.body;
    if (!name || !description || !tag) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "All fields (name, description, tag) are required.",
      });
      return;
    }
    const product = await prisma.product.create({
      data: {
        name,
        description,
        tag,
      },
    });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "product create successfully",
      product: product,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "surver error",
      error,
    });
  }
};

//Product Get All
export const productGetAll = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findMany();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "product Gett successfully",
      product: product,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "surver error",
      error,
    });
  }
};

//Product Get Single
export const ProductGetSingle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!product) {
      res.send("Product not found");
      return;
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "product Gett successfully",
      product: product,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "surver error",
      error,
    });
  }
};

//Product update
export const productUpdate = async (req: Request, res: Response) => {
  try {
    const { name, description, tag } = req.body;
    const id = req.params.id;
    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        description,
        tag,
      },
    });
    if (!product) {
      res.send("Product not found");
      return;
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "product updated successfully",
      product: product,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "surver error",
      error,
    });
  }
};
//Product Delete
