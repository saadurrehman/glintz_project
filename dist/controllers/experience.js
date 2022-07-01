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
exports.deleteExperienceById = exports.updateExperience = exports.addExperience = void 0;
const Experience_1 = __importDefault(require("../models/Experience"));
const users_1 = require("./users");
const addExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profileUrl = null;
        if (req.file) {
            profileUrl = yield (0, users_1.addFile)(req.file, "experience");
        }
        const experience = yield Experience_1.default.create(Object.assign(Object.assign({}, req.body), { companyLogo: profileUrl ? profileUrl : "" }));
        res.status(200).json({ success: true, experience });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, err });
    }
});
exports.addExperience = addExperience;
const updateExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
        let profileUrl = null;
        if (req.file) {
            profileUrl = yield (0, users_1.addFile)(req.file, "experience");
        }
        yield Experience_1.default.update(profileUrl ? Object.assign(Object.assign({}, req.body), { companyLogo: profileUrl }) : req.body, {
            where: {
                id,
            },
        });
        const experiences = yield Experience_1.default.findAll({
            where: {
                user_id,
            },
        });
        res.status(200).json({ success: true, experiences });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, err });
    }
});
exports.updateExperience = updateExperience;
const deleteExperienceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const experience = yield Experience_1.default.destroy({
            where: {
                id,
            },
        });
        res.status(200).json({ success: true, experience });
    }
    catch (err) {
        res.status(400).json({ success: false, err });
    }
});
exports.deleteExperienceById = deleteExperienceById;
