const User = require("../models/user.model");
const cloudinary = require('cloudinary').v2;

async function createUser(req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.files.file.tempFilePath);
    const imageUrl = result.secure_url;
    const user = await User.create({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      street: req.body.street,
      city: req.body.city,
      zipCode: req.body.zipCode,
      role: req.body.role,
      image: req.body.imageUrl
    });
    console.log("user created successfully", user);
    res.status(200).json(user);
  } catch (error) {
    console.log(err, "Something went wrong when creating a new user");
      res.status(400).json(err);
  }
}

async function getAllUsers(req, res) {
  User.find()
    .then((user) => {
      console.log("users found", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err, "Something went wrong when fetching all users");
      res.status(400).json(err);
    });
}

async function getUserById(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      console.log("User found by ID: ", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("User ID not found", err);
      res.status(400).json(err);
    });
}

async function updateUser(req, res) {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { upsert: true },
    { new: true }
  )
    .then((user) => {
      console.log("The user has been updated: ", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("The user was not updated", err);
      res.status(400).json(err);
    });
}

async function deleteUser(req, res) {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      console.log("The user has been deleted", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("The user could not be deleted", err);
      res.status(400).json(err);
    });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
