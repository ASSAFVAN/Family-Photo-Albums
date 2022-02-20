const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const {
  createNewAlbum,
  getAlbum,
  getAllAlbums,
  getAlbumsBySignIn,
  uploadImages,
  deleteImage,
  deleteAlbum,
  changePrivateStatus,
} = require("../controllers/albumControllers");

// router.get("/albums", getAllAlbums);
router.post("/albums/newalbum", auth, createNewAlbum);
router.get("/albums", auth, getAlbumsBySignIn);
router.get("/albums/:id", getAlbum);
router.delete("/albums/:id", auth, deleteAlbum);
router.delete("/albums/:id/:index", auth, deleteImage);
router.put("/albums/:id", auth, changePrivateStatus);
router.post("/albums/:id", upload.array("images", 10), uploadImages);

module.exports = router;
