const express = require("express");
const { addTodo } = require("../../controller/todosController");
const router = express.Router();

router.post("/", addTodo);

module.exports = router;
