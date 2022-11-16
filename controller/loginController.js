const bcrypt = require("bcrypt");
const User = require("../model/User");

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "email and password required" });
  }
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) {
      return res
        .status(401)
        .json({ message: "Please use an authorized email" });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "The password you entered is incorrect" });
    }

    return res.json({
      message: "successfully logged in",
      userTodos: foundUser.todos,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = login;
