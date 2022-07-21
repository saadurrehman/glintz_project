import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import Experience from "../models/Experience";
import { storage } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import fs from "fs";

export const addFile = async (
  file: Express.Multer.File | string,
  folder: string,
  extension?: string
): Promise<string | Error | undefined> => {
  if (file) {
    let storageRef;
    let uploadTask: UploadTask;

    if (typeof file === "string") {
      storageRef = ref(
        storage,
        `${folder}/${new Date().getMilliseconds().toString()}.${extension}`
      );
      uploadTask = uploadBytesResumable(storageRef, new Buffer(file));
    } else {
      storageRef = ref(storage, `${folder}/${file.originalname}`);
      uploadTask = uploadBytesResumable(storageRef, file.buffer);
    }

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
};
export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, age, experience, description } = req.body;

  try {
    let profileUrl = null;
    if (req.file) {
      profileUrl = await addFile(req.file, "files");
    }

    const added = await User.create({
      name,
      age,
      experience,
      description,
      profilePicture: profileUrl ? profileUrl : "",
    });
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
    const user = await User.findByPk(id, {
      include: [
        {
          model: Experience,
        },
      ],
    });

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

  let profileUrl = null;

  if (req.file) {
    profileUrl = await addFile(req.file, "files");
  }

  try {
    await User.update(
      profileUrl ? { ...req.body, profilePicture: profileUrl } : req.body,
      {
        where: {
          id,
        },
      }
    );

    const user = await User.findByPk(id, {
      include: [
        {
          model: Experience,
        },
      ],
    });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
};
