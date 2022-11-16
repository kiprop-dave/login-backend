const axios = require("axios");
const bcrypt = require("bcrypt");
const api_key = process.env.ABSTRACT_API_KEY;
const user = require("../model/User");

const signUp = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "email and password required" });
  }
  const { email, password } = req.body;

  try {
    const duplicate = await user.findOne({ email: email });
    if (duplicate) {
      return res.status(409).json({ message: "user already exists" });
    }
    const response = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${api_key}&email=${email}`,
    );
    const { deliverability } = response.data;
    if (deliverability !== "DELIVERABLE") {
      return res.status(400).json({ message: "Please enter a valid email" });
    }
    const hashedPwd = await bcrypt.hash(password, 10);
    await user.create({
      email: email,
      password: hashedPwd,
    });

    return res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = signUp;
