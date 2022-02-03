const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
