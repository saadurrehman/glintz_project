"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const experience_1 = require("../controllers/experience");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const filefilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    }
    else
        cb(null, false);
};
const upload = (0, multer_1.default)({
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: filefilter,
});
router.post("/add", upload.single("imageData"), experience_1.addExperience);
router.patch("/update/:id", upload.single("imageData"), experience_1.updateExperience);
router.delete("/delete/:id", experience_1.deleteExperienceById);
module.exports = router;
