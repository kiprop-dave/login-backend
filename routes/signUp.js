const express = require("express");
const router = express.Router();
const signUp = require("../controller/signUpController");

router.post("/", signUp);

module.exports = router;
