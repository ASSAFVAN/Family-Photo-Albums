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
      return res.status(409).send("User Already Exist. Please signIn");
    }
    const token = await newUser.generateAuthToken();
    await newUser.save();
    res.status(201).send({ newUser, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// user signIn
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    // res.status(200).send({ user, token });
    res.status(200).send("signed in successfuly");
  } catch (error) {
    res.status(400).send({ error: "Invalid Credentials" });
  }
};

// logout user
const logout = async (req, res) => {
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

module.exports = {
  signUp,
  signIn,
  logout,
  getUser,
  getAllUsers,
};
