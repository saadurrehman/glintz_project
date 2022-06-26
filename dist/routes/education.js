"use strict";
const express = require("express");
const { addEducation } = require("../controllers/education");
const router = express.Router();
router.post("/add", addEducation);
module.exports = router;
