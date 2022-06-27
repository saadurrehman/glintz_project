import { Request, Response, NextFunction } from "express";
import Experience from "../models/Experience";

export const addExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    startDate,
    endDate,
    companyName,
    user_id,
    description,
    isCurrentlyWorkingHere,
  } = req.body;

  try {
    const added = await Experience.create({
      startDate,
      endDate,
      companyName,
      user_id,
      description,
      isCurrentlyWorkingHere,
    });
    res.status(200).json({ success: true, added });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, err });
  }
};

export const updateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const updated = await Experience.update(
      { ...req.body },
      {
        where: {
          id,
        },
      }
    );

    res.status(200).json({ success: true, added: updated });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, err });
  }
};
