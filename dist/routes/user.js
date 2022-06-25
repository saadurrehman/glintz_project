"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const users_1 = require("../controllers/users");
const router = express.Router();
router.post("/add", users_1.addUser);
module.exports = router;
