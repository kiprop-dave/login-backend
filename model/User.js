const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  toDo: {
    type: String,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [todoSchema],
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
