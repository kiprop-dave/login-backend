const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

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

    const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN, {
      expiresIn: "1d",
    });

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("todojwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "successfully logged in",
      userTodos: foundUser.todos,
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = login;
