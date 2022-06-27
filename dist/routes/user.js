"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
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
router.get("/:id", users_1.getUserById);
router.post("/add", upload.single("imageData"), users_1.addUser);
router.patch("/update/:id", upload.single("imageData"), users_1.updateUser);
module.exports = router;
