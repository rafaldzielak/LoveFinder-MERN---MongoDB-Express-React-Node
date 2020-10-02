const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const authMiddleware = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   GET api/profile/user/user_id
// @desc    Get profile by user id
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["date", "avatar"]);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   GET api/profile/mme
// @desc    Get profile of current logged user
// @access  Private
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["date", "avatar", "email"]);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   POST api/profile
// @desc    Create profiles
// @access  Private
router.post(
  "/",
  [
    authMiddleware,
    [
      check("name", "Name is required").not().isEmpty(),
      check("age", "Age is required").isNumeric(),
      check("preference", "Preference is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    try {
      const { name, photo, age, description, preference, likedBy } = req.body;
      console.log(req.user.id);
      const userId = req.user.id;
      const profileFields = {};
      profileFields.user = userId;
      if (photo) profileFields.photo = photo;
      if (name) profileFields.name = name;
      if (age) profileFields.age = age;
      if (preference) profileFields.preference = preference;
      if (description) profileFields.description = description;
      if (likedBy) profileFields.likedBy = likedBy;
      let profile = await Profile.findOne({ user: userId });
      console.log(profile);
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: userId },
          { $set: profileFields },
          { new: true }
        );
        Profile.findByIdAndUpdate();
        return res.json(profile);
      }
      profile = new Profile(profileFields);

      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/profile
// @desc    Delete profile & user
// @access  Private
router.delete("/", authMiddleware, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findByIdAndRemove(req.user.id);
    res.send("User & Profile removed");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
