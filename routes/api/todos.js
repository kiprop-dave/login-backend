const express = require("express");
const {
  addTodo,
  deleteTodo,
  updateTodo,
  clearCompleted,
} = require("../../controller/todosController");
const router = express.Router();

router
  .post("/create", addTodo)
  .delete("/delete", deleteTodo)
  .put("/completed", updateTodo)
  .delete("/clear", clearCompleted);

module.exports = router;
