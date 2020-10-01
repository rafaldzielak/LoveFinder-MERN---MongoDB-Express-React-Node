const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// @route   GET api/users
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("ROuter Get users"));

// REGISTRATION
// @route   GET api/users
// @desc    Register new user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password length must be greater than 5").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
    } catch (error) {}
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, avatar } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    user = new User({ name, email, password, avatar });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };

    jwt.sign(payload, config.get("jwtToken"), (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  }
);

module.exports = router;
