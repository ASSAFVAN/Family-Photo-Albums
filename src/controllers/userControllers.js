const userModel = require("../model/user");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Adding a new user
const signUp = async (req, res) => {
  const { email } = req.body;
  const newUser = await new userModel(req.body);
  try {
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res
        .status(409)
        .send({ error: "User Already Exists. Please signIn" });
    }
    const token = await newUser.generateAuthToken();
    await newUser.save();
    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// user signIn
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
    // res.status(200).send("signed in successfuly");
  } catch (error) {
    res.status(400).send({ error: "Invalid Credentials" });
  }
};

// logout user
const signOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send("logout successfuly");
  } catch (error) {
    res.status(500).send({ error: "Invalid Credentials" });
  }
};

// Show details of specific user
const getUser = async (req, res) => {
  const userID = req.params.id;
  try {
    const matchedUser = await userModel.findById(userID);
    if (!matchedUser) {
      return res.status(404).send(`user id ${id} cannot be found`);
    }
    res.status(200).send(matchedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add image to favorites page
const addToFavorites = async (req, res) => {
  const userID = req.params.id;
  const imgName = req.body.imageName;

  try {
    const matchedUser = await userModel.findById(userID);
    if (!matchedUser) {
      return res.status(404).send(error);
    }
    matchedUser.favorites.push(imgName);
    await matchedUser.save();
    res.status(200).send("added to favorites");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Show user's favorites page
const getUserFavorites = async (req, res) => {
  const userID = req.params.id;
  try {
    const matchedUser = await userModel.findById(userID);
    if (!matchedUser) {
      return res.status(404).send(`user id ${id} cannot be found`);
    }
    res.status(200).send(matchedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Remove image from favorites list

const deleteFavImage = async (req, res) => {
  const userID = req.params.id;
  const imgIndex = req.params.imgid;
  try {
    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(401).send(`user id ${id} cannot be found`);
    }
    const imageToDelete = user.favorites[imgIndex];
    const updatedImages = user.favorites.filter((image) => {
      return image !== imageToDelete;
    });
    user.favorites = updatedImages;
    user.save();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  getUser,
  getUserFavorites,
  getAllUsers,
  addToFavorites,
  getUserFavorites,
  deleteFavImage,
};
