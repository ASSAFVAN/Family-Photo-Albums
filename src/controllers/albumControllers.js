const albumModel = require("../model/album");
const fs = require("fs");

// Get all albums
const getAllAlbums = async (req, res) => {
  try {
    const albums = await albumModel.find();
    res.status(200).send(albums);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get owner private albums and all other users public albums
const getAlbumsBySignIn = async (req, res) => {
  try {
    const albums = await albumModel.find({
      $or: [{ owner: req.user._id }, { privateAlbum: false }],
    });
    res.status(200).send(albums);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get specific album
const getAlbum = async (req, res) => {
  const albumID = req.params.id;
  try {
    // const album = await albumModel.findOne({ albumID, owner: req.user._id });
    const album = await albumModel.findById(albumID);
    // console.log(album);

    if (!album) {
      return res.status(404).send();
    }
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Adding a new album
const createNewAlbum = async (req, res) => {
  const newAlbum = await new albumModel({
    ...req.body,
    owner: req.user._id,
  });
  try {
    const oldAlbum = await albumModel.findOne({ name: newAlbum.name });
    if (oldAlbum) {
      return res
        .status(409)
        .send("Albums name Already Exist. Please select other");
    }
    await newAlbum.save();
    res.status(201).send({ newAlbum });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Upload images to specific album
const uploadImages = async (req, res) => {
  const albumID = req.params.id;
  try {
    const album = await albumModel.findById(albumID);
    const files = req.files;
    files.map((image) => {
      album.images.push(`/images/${image.filename}`);
      // console.log(album);
    });
    album.save();
    res.status(200).send({
      message: "multiple files upload successfully",
      images: album.images,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete specific image from an album
const deleteImage = async (req, res) => {
  // const albumID = req.params.id;
  const imageIndex = req.params.index;
  // console.log(albumID);

  try {
    const album = await albumModel.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!album) {
      return res.status(401).send("Only album's owner can delete images");
    }
    const imageToDelete = album.images[imageIndex];
    const updatedImages = album.images.filter((image) => {
      return image !== imageToDelete;
    });
    album.images = updatedImages;
    album.save();

    // const path = `.${imageToDelete}`;
    // console.log(path);
    // fs.unlinkSync(path);

    res.status(200).send(album);
  } catch (e) {
    res.status(500).send();
  }
};

const changePrivateStatus = async (req, res) => {
  const albumID = req.params.id;
  try {
    const album = await albumModel.findOne({
      _id: albumID,
      owner: req.user._id,
    });
    if (!album) {
      return res.status(401).send("Only album's owner can change album status");
    }
    let privateStatus = album.privateAlbum;
    privateStatus = !privateStatus;
    album.privateAlbum = privateStatus;
    album.save();
    res.status(200).send(album);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllAlbums,
  getAlbum,
  getAlbumsBySignIn,
  createNewAlbum,
  uploadImages,
  deleteImage,
  changePrivateStatus,
};
