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
} = require("../controllers/albumControllers");

router.post("/albums/newalbum", auth, createNewAlbum);
// router.get("/albums", getAllAlbums);
router.get("/albums", auth, getAlbumsBySignIn);
router.get("/albums/:id", getAlbum);
router.delete("/albums/:id/:index", auth, deleteImage);
router.post("/albums/:id", upload.array("images", 3), uploadImages);

module.exports = router;
