const jwt = require("jsonwebtoken");
const User = require("../model/User");

const refreshLogin = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.todojwt) {
    return res.status(401).json({ message: "unauthorized" });
  }
  const refreshToken = cookies.todojwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken });

  if (!foundUser) {
    return res.status(403).json({ message: "forbidden" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || decoded.email !== foundUser.email) {
      return res.status(403).json({ message: "forbidden" });
    }
    const accessToken = jwt.sign(
      { email: decoded.email },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1h" },
    );

    return res.json({ accessToken });
  });
};

module.exports = refreshLogin;
