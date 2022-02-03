const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  signUp,
  signIn,
  signOut,
  getUser,
  getAllUsers,
} = require("../controllers/userControllers");

router.post("/users/signup", signUp);
router.post("/users/signin", signIn);
router.post("/users/signout", auth, signOut);
router.get("/users", getAllUsers);
router.get("/users/:id", getUser);

module.exports = router;
