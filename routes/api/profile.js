const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const authMiddleware = require("../../middleware/auth");
const axios = require("node-fetch");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().select("-messages");
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
    })
      .populate("user", ["date", "avatar"])
      .select("-messages");
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   GET api/profile/me
// @desc    Get profile of current logged user
// @access  Private
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    })
      .populate("user", ["date", "avatar", "email"])
      .select("-messages");
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   POST api/profile
// @desc    Create & update profile
// @access  Private
router.post(
  "/",
  [
    authMiddleware,
    [
      check("name", "Name is required").not().isEmpty(),
      check("age", "Age is required").isNumeric(),
      check("sex", "Sex must be either 'male' or 'female'").isString(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const {
        name,
        photo,
        age,
        sex,
        description,
        preferenceMale,
        preferenceFemale,
        likedBy,
      } = req.body;
      console.log(req.user.id);
      const userId = req.user.id;
      const profileFields = {};
      profileFields.user = userId;
      if (photo) profileFields.photo = photo;
      if (name) profileFields.name = name;
      if (age) profileFields.age = age;
      if (sex) profileFields.sex = sex;
      if (preferenceMale) profileFields.preferenceMale = true;
      else profileFields.preferenceMale = false;
      if (preferenceFemale) profileFields.preferenceFemale = true;
      else profileFields.preferenceFemale = false;
      if (description) profileFields.description = description;
      if (likedBy) profileFields.likedBy = likedBy;
      let profile = await Profile.findOne({ user: userId });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: userId },
          { $set: profileFields },
          { new: true }
        );
        Profile.findByIdAndUpdate();
        console.log(profile);
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

// @route   GET api/profile/message/:from_user/:touser
// @desc    get messages from user to specific user
// @access  Private
router.get("/message/:from_user/:touser", authMiddleware, async (req, res) => {
  try {
    const profileAuth = await Profile.findOne({ user: req.user.id });
    // const profiletoChat = await Profile.findOne({ user: req.params.to_user });
    console.log(`from_user: ${req.params.from_user}`);
    console.log(`to_user: ${req.params.touser}`);
    console.log(profileAuth.messages);
    messages = profileAuth.messages.filter(
      (message) => message.to === req.params.touser || message.from === req.params.touser
    );
    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   POST api/profile/message/:touser
// @desc    Send message to specific user
// @access  Private
router.post("/message/:to_user", authMiddleware, async (req, res) => {
  try {
    console.log(req.user.id);
    const profileAuth = await Profile.findOne({ user: req.user.id });
    if (profileAuth === null) {
      return res.json({ msg: "Profile not found" });
    }
    const toProfile = await Profile.findOne({ user: req.params.to_user });
    if (!toProfile) {
      return res.json({ msg: "Recipient of the message not found" });
    }
    const messagesAuth = profileAuth.messages;
    const messagesTo = toProfile.messages;

    message = {
      msg: req.body.msg,
      from: req.user.id,
      to: req.params.to_user,
      date: new Date(),
    };
    messagesAuth.push(message);
    messagesTo.push(message);
    profileAuth.messages = messagesAuth;
    toProfile.messages = messagesTo;
    profileAuth.save();
    toProfile.save();
    return res.json({ profileAuth });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;

// @route   GET api/profile/fav
// @desc    Get all favourite profiles
// @access  Private
router.get("/fav", authMiddleware, async (req, res) => {
  try {
    const likedProfiles = await Profile.find({
      likedBy: req.user.id,
    }).select("-messages");
    console.log(likedProfiles);
    res.json(likedProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// @route   POST api/profile/fav
// @desc    Like profile
// @access  Public
router.post("/fav/:profileToLike", authMiddleware, async (req, res) => {
  try {
    console.log(req.params.profileToLike);
    console.log("IN likeProfile");
    const likedProfile = await Profile.findById(req.params.profileToLike).select("-messages");
    console.log("likedProfile:");
    console.log(likedProfile);
    likedProfile.likedBy.push(req.user.id);
    likedProfile.save();
    res.json(likedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
