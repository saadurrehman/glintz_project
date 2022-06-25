"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "postgres",
    port: +process.env.DB_PORT,
});
//server connection
// const sequelize = new Sequelize(
//   "heroku_f0106001a89edd5",
//   "bfeaafb8a11fa5",
//   "e90c830c",
//   {
//     host: "us-cdbr-east-05.cleardb.net",
//     dialect: "mysql",
//   }
// );
