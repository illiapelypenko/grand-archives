const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ error: "email" });
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password
    });
    const doc = await newUser.save();
    const token = jwt.sign({ _id: doc._id }, "PrivateKey");
    res.json({ token, name: doc.name });
  } catch (e) {
    res.status(500).json({ error: "SERVER ERROR" });
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "email" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "password" });
    }
    const token = jwt.sign({ _id: user._id }, "PrivateKey");
    res.json({ token, name: user.name });
  } catch (e) {
    res.status(500).json({ error: "SERVER ERROR" });
    console.log(e);
  }
});

module.exports = router;
