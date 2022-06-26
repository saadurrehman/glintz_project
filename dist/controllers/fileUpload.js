"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFile = void 0;
const addFile = (req, res) => {
    console.log("hello");
    const imgName = req.file ? req.file.filename : "noprofilepic.jpg";
    console.log(req.file);
};
exports.addFile = addFile;
