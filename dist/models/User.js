"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const Experience_1 = __importDefault(require("./Experience"));
const User = connection_1.default.define("users", {
    name: {
        type: sequelize_1.STRING,
    },
    profilePicture: {
        type: sequelize_1.STRING,
        allowNull: true,
    },
    age: {
        type: sequelize_1.INTEGER,
    },
    experience: {
        type: sequelize_1.INTEGER,
    },
    description: {
        type: sequelize_1.STRING,
    },
}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
});
User.hasMany(Experience_1.default, {
    foreignKey: "user_id",
});
exports.default = User;
