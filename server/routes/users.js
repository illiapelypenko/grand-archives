const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

router.put("/isuser", async (req, res) => {
  const token = req.body.token;
  try {
    const isVerified = await jwt.verify(token, secretKey);
    const user = await User.findById(isVerified._id);
    if (user) {
      res.json({ status: "ok" });
    } else {
      res.status(500).send("invalid");
    }
  } catch (e) {
    res.status(500).send("invalid");
    console.log(e);
  }
});

router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    const userName = await User.findOne({ name });

    // checking if email or name already exists
    if (userEmail) {
      return res.status(400).json({ error: "email" });
    }
    if (userName) {
      return res.status(400).json({ error: "name" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password,
      ratedContent: []
    });
    const doc = await newUser.save();
    const token = jwt.sign({ _id: doc._id }, secretKey);

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

    // checking if email is valid
    if (!user) {
      return res.status(400).json({ error: "email" });
    }

    // checking if password is valid
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "password" });
    }
    const token = jwt.sign({ _id: user._id }, secretKey);

    res.json({ token, name: user.name });
  } catch (e) {
    res.status(500).json({ error: "SERVER ERROR" });
    console.log(e);
  }
});

module.exports = router;
