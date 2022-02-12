const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  thumbnail: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  privateAlbum: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  // images: [
  //   {
  //     lat: {
  //       type: String,
  //       required: true
  //     },
  //     lng: {
  //       type: string,
  //       default: true
  //     }
  //   }
  // ]
  images: {
    type: Array,
  },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
