import { Request, Response, NextFunction } from "express";
import Experience from "../models/Experience";
import User from "../models/User";
import { addFile } from "./users";

export const addExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let profileUrl = null;
    if (req.file) {
      profileUrl = await addFile(req.file, "experience");
    }

    const experience = await Experience.create({
      ...req.body,
      companyLogo: profileUrl ? profileUrl : "",
    });

    res.status(200).json({ success: true, experience });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, err });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id } = req.body;

  try {
    let profileUrl = null;
    if (req.file) {
      profileUrl = await addFile(req.file, "experience");
    }

    await Experience.update(
      profileUrl ? { ...req.body, companyLogo: profileUrl } : req.body,
      {
        where: {
          id,
        },
      }
    );

    const experiences = await Experience.findAll({
      where: {
        user_id,
      },
    });

    res.status(200).json({ success: true, experiences });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, err });
  }
};

export const deleteExperienceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const experience = await Experience.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ success: true, experience });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};
