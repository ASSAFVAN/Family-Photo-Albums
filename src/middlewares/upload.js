const multer = require("multer");
// const fs = require("fs");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./client/public/images`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorageEngine,
  limits: {
    fileSize: 1000000, // in 1000000 Bytes -> 1mb
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
