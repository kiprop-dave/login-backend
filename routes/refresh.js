const express = require("express");
const router = express.Router();
const refreshLogin = require("../controller/refreshController");

router.get("/", refreshLogin);

module.exports = router;
