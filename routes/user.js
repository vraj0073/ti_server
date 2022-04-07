const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const signup = async (req, res) => {
  const { name, address, phoneNumber, email, role, password } = req.body;
  console.log("inside signup")
  try {
    const newUser = new User({
      name,
      address,
      phoneNumber,
      email,
      role,
      password,
    });
    await newUser.save();

    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Something went wrong!",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("insdelogin")
  console.log(email)
  console.log(password)

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        sucess: false,
        message: "Email is not valid!",
      });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(404).json({
        sucess: false,
        message: "Password is not valid!",
      });
      return;
    }

    const token = jwt.sign({ email }, "mypass");
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
