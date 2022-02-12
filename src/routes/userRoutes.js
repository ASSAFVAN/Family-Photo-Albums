const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  signUp,
  signIn,
  signOut,
  getUser,
  getAllUsers,
  addToFavorites,
  getUserFavorites,
  deleteFavImage,
} = require("../controllers/userControllers");

router.post("/users/signup", signUp);
router.post("/users/signin", signIn);
router.post("/users/signout", auth, signOut);
router.get("/users/favorites/:id", auth, getUserFavorites);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);
router.post("/users/favorites/:id", addToFavorites);
router.delete("/users/favorites/:id/:imgid", auth, deleteFavImage);

module.exports = router;
