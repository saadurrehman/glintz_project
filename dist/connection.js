"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = new sequelize_1.Sequelize("heroku_254bee4a05f9d78", "b3fad8e0bff819", "22d1ddee", {
    host: "us-cdbr-east-06.cleardb.net",
    dialect: "mysql",
});
