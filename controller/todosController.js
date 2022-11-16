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
    return res.json({ message: "todo added", todos: foundUser.todos });
  } catch (error) {
    console.log(error);
  }
};

const deleteTodo = async (req, res) => {};

module.exports = { addTodo, deleteTodo };
