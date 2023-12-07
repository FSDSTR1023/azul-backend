const UserCliente = require("../models/userCliente.model");

async function createUserCliente(req, res) {
  UserCliente.create(req.body)
    .then((user) => {
      console.log("user created successfully", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err, "Something went wrong when creating a new user");
      res.status(400).json(err);
    });
}

async function getAllUsersCliente(req, res) {
  UserCliente.find()
    .then((user) => {
      console.log("users found", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err, "Something went wrong when fetching all users");
      res.status(400).json(err);
    });
}

async function getUserClienteById(req, res) {
  UserCliente.findById(req.params.id)
    .then((user) => {
      console.log("User found by ID: ", user);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log("User ID not found", err);
      res.status(400).json(err);
    });
}

async function updateUserCliente(req, res) {
  UserCliente.findByIdAndUpdate(
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

async function deleteUserCliente(req, res) {
  UserCliente.findByIdAndDelete(req.params.id)
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
  createUserCliente,
  getAllUsersCliente,
  getUserClienteById,
  updateUserCliente,
  deleteUserCliente,
};
