"use strict";
const express = require("express");
const { addExperience } = require("../controllers/experience");
const router = express.Router();
router.post("/add", addExperience);
module.exports = router;
