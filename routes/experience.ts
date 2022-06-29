import express from "express";
import {
  addExperience,
  updateExperience,
  deleteExperienceById,
} from "../controllers/experience";
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

router.post("/add", upload.single("imageData"), addExperience);
router.patch("/update/:id", upload.single("imageData"), updateExperience);
router.delete("/delete/:id", deleteExperienceById);

module.exports = router;
