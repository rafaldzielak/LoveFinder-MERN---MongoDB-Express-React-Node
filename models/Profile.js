const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  preference: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  likedBy: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
