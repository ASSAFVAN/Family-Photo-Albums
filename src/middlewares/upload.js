const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const CLOUDINARY_NAME = process.env.CLOUD_NAME;
const CLOUDINARY_KEY = process.env.API_KEY;
const CLOUDINARY_SECRET = process.env.API_SECRET;

// const fs = require("fs");

cloudinary.config({
  cloud_name: `${CLOUDINARY_NAME}`,
  api_key: `${CLOUDINARY_KEY}`,
  api_secret: `${CLOUDINARY_SECRET}`,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "albums",
  },
});

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, `./client/public/images`);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "--" + file.originalname);
//   },
// });

const upload = multer({
  // storage: fileStorageEngine,
  storage: storage,
  limits: {
    fileSize: 3000000, // in 1000000 Bytes -> 1mb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      // First one of setting File Type to upload
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

module.exports = upload;
