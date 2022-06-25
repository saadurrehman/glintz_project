const express = require("express");
import { addUser } from "../controllers/users";

const router = express.Router();
router.post("/add", addUser);

module.exports = router;
