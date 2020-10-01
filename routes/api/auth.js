const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (errors.length > 0)
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ errors: [{ msg: "Invalid cred." }] });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ errors: [{ msg: "Invalid cred." }] });
      const payload = { user: { id: user.id } };
      jwt.sign(payload, config.get("jwtToken"), (error, token) => {
        if (error) throw error;
        res.json({ token });
      });
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
