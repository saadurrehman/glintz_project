import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, age, experience } = req.body;

  try {
    const added = await User.create({ name, age, experience });
    res.status(200).json({ success: true, added });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, err });
  }
};

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, age, experience } = req.body;

  try {
    const users = await User.findAll();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await User.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const user = await User.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};
