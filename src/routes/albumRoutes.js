const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  createNewAlbum,
  // getAlbum,
  getAllAlbums,
} = require("../controllers/albumControllers");

router.post("/albums/newalbum", auth, createNewAlbum);
router.get("/albums", getAllAlbums);
// router.get("/albums/:id", getAlbum);

module.exports = router;
