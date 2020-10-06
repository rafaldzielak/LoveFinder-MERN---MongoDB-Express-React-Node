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
  sex: {
    type: String,
    required: true,
  },
  preferenceMale: {
    type: Boolean,
    required: true,
  },
  preferenceFemale: {
    type: Boolean,
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
  messages: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
