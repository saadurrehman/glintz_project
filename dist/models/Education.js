"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const Education = connection_1.default.define("education", {
    instituteName: {
        type: sequelize_1.STRING,
    },
    user_id: {
        type: sequelize_1.INTEGER,
    },
    startDate: {
        type: sequelize_1.DATEONLY,
    },
    endDate: {
        type: sequelize_1.DATEONLY,
    },
}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
});
exports.default = Education;
