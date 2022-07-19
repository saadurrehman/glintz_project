"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const Experience = connection_1.default.define("experience", {
    companyName: {
        type: sequelize_1.STRING,
    },
    companyLogo: {
        // URL
        type: sequelize_1.STRING,
    },
    user_id: {
        type: sequelize_1.INTEGER,
    },
    description: {
        type: sequelize_1.TEXT,
    },
    jobTitle: {
        type: sequelize_1.STRING,
    },
    isCurrentlyWorkingHere: {
        type: sequelize_1.BOOLEAN,
    },
    startDate: {
        type: sequelize_1.DATEONLY,
    },
    endDate: {
        type: sequelize_1.DATEONLY,
    },
}, {
    timestamps: true,
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
});
exports.default = Experience;
