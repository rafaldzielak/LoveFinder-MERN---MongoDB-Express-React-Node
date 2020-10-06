const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  toUser: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    // required: true,
    default: new Date(),
  },
});
