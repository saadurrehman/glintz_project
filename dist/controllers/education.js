"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEducation = void 0;
const Education_1 = __importDefault(require("../models/Education"));
const addEducation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate, instituteName, user_id } = req.body;
    try {
        const added = yield Education_1.default.create({
            startDate,
            endDate,
            instituteName,
            user_id,
        });
        res.status(200).json({ success: true, added });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, err });
    }
});
exports.addEducation = addEducation;
