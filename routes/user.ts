import express from "express";
import { addUser, getUserById, updateUser } from "../controllers/users";
import multer from "multer";

const router = express.Router();

const filefilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else cb(null, false);
};

const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: filefilter,
});

router.get("/:id", getUserById);
router.post("/add", upload.single("imageData"), addUser);
router.patch("/update/:id", upload.single("imageData"), updateUser);

module.exports = router;
