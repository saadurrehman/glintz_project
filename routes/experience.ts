import express from "express";
const {
  addExperience,
  updateExperience,
} = require("../controllers/experience");

const router = express.Router();
router.post("/add", addExperience);
router.post(":id", updateExperience);

module.exports = router;
