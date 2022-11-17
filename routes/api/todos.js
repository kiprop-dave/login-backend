const express = require("express");
const {
  addTodo,
  deleteTodo,
  updateTodo,
} = require("../../controller/todosController");
const router = express.Router();

router
  .post("/create", addTodo)
  .delete("/delete", deleteTodo)
  .put("/completed", updateTodo);

module.exports = router;
