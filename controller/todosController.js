const User = require("../model/User");

const addTodo = async (req, res) => {
  if (!req.body.email || !req.body.newTodo) {
    return res
      .status(400)
      .json({ message: "add user email and newTodo object" });
  }
  const { email, newTodo } = req.body;
  try {
    let foundUser = await User.findOneAndUpdate(
      { email: email },
      { $push: { todos: { $each: [newTodo], $position: 0 } } },
      { new: true },
    );
    return res.json({ message: "todo added", userTodos: foundUser.todos });
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (req, res) => {
  if (!req.body.email || !req.body.todoId) {
    return res.status(400).json({ message: "add user email and todoId" });
  }
  const { email, todoId } = req.body;
  try {
    let foundUser = await User.findOneAndUpdate(
      { email: email },
      { $pull: { todos: { _id: { $eq: todoId } } } },
      { new: true },
    );
    return res.json({ message: "todo deleted", userTodos: foundUser.todos });
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (req, res) => {
  if (!req.body.email || !req.body.todoId) {
    return res.status(400).json({ message: "add user email and todoId" });
  }
  const { email, todoId } = req.body;
  try {
    let foundUser = await User.findOneAndUpdate(
      { email: email, todos: { $elemMatch: { _id: todoId } } },
      { $set: { "todos.$.isCompleted": true } },
      { new: true },
    );
    return res.json({ message: "todos updated", userTodos: foundUser.todos });
  } catch (error) {
    console.log(error);
  }
};

const clearCompleted = async (req, res) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "add user email" });
  }

  const { email } = req.body;
  try {
    let foundUser = await User.findOne({ email: email }).exec();
    const uncompletedTodos = foundUser.todos.filter(
      (todo) => !todo.isCompleted,
    );
    foundUser.todos = uncompletedTodos;
    await foundUser.save();
    return res.json({ message: "todos updated", userTodos: foundUser.todos });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "There was a problem with the server" });
  }
};

module.exports = { addTodo, deleteTodo, updateTodo, clearCompleted };
