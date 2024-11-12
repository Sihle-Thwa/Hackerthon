const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
