const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const {
  signUp,
  signIn,
  logout,
  getUser,
  getAllUsers,
} = require("../controllers/userControllers");

router.post("/users/signup", signUp);
router.post("/users/signin", signIn);
router.get("/users", getAllUsers);
router.post("/users/logout", auth, logout);
router.get("/users/:id", getUser);

module.exports = router;
