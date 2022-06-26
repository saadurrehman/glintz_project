import express from "express";
import multer from "multer";
import { addFile } from "../controllers/fileUpload";

const router = express.Router();

const filefilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else cb(null, false);
};

const upload = multer({
  //   storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});

router.post("/add", upload.single("imageData"), addFile);

module.exports = router;
