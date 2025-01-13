const express = require("express");
const { register, login } = require("../services/authService");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await register(req.body);
    req.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = await login(req.body);
    req.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
