import { Request, Response, NextFunction } from "express";

export const addFile = (req: any, res: Response) => {
  console.log("hello");
  const imgName = req.file ? req.file.filename : "noprofilepic.jpg";
  console.log(req.file);
};
