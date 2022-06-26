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
exports.updateUser = exports.deleteUserById = exports.getUserById = exports.getAllUser = exports.addUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, experience } = req.body;
    try {
        const added = yield User_1.default.create({ name, age, experience });
        res.status(200).json({ success: true, added });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ success: false, err });
    }
});
exports.addUser = addUser;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, experience } = req.body;
    try {
        const users = yield User_1.default.findAll();
        res.status(200).json({ success: true, users });
    }
    catch (err) {
        res.status(400).json({ success: false, err });
    }
});
exports.getAllUser = getAllUser;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.findByPk(id);
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        res.status(400).json({ success: false, err });
    }
});
exports.getUserById = getUserById;
const deleteUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.destroy({
            where: {
                id,
            },
        });
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        res.status(400).json({ success: false, err });
    }
});
exports.deleteUserById = deleteUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield User_1.default.destroy({
            where: {
                id,
            },
        });
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        res.status(400).json({ success: false, err });
    }
});
exports.updateUser = updateUser;
