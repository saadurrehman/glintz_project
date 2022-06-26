import express from "express";
import { addUser } from "../controllers/users";
import multer from "multer";

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

router.post("/add", upload.single("imageData"), addUser);
router.post("/add", upload.single("imageData"), addUser);

module.exports = router;
