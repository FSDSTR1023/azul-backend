const Rent = require("../models/rent.model");

async function createRent(req, res) {
  Rent.create(req.body)
    .then((rent) => {
      console.log("New rent created successfully", rent);
      global.io.emit('rentCreated')
      res.status(200).json(rent);
    })
    .catch((err) => {
      console.log(err, "Something went wrong when creating a new rent");
      res.status(400).json(err);
    });
}

async function getAllRents(req, res) {
  Rent.find()
    .populate("user")
    .populate("machine")
    .exec()
    .then((rent) => {
      // console.log("rents found", rent);
      res.status(200).json(rent);
    })
    .catch((err) => {
      console.log(err, "Something went wrong when fetching all rents");
      res.status(400).json(err);
    });
}

async function getRentById(req, res) {
  Rent.findById(req.params.id)
    .then((rent) => {
      console.log("Rent found by ID: ", rent);
      res.status(200).json(rent);
    })
    .catch((err) => {
      console.log("Rent ID not found", err);
      res.status(400).json(err);
    });
}

async function updateRent(req, res) {
  Rent.findByIdAndUpdate(
    req.params.id,
    req.body,
    { upsert: true },
    { new: true }
  )
    .then((rent) => {
      console.log("The rent has been updated: ", rent);
      res.status(200).json(rent);
    })
    .catch((err) => {
      console.log("The rent was not updated", err);
      res.status(400).json(err);
    });
}

async function deleteRent(req, res) {
  Rent.findByIdAndDelete(req.params.id)
    .then((rent) => {
      console.log("The rent has been deleted", rent);
      res.status(200).json(rent);
    })
    .catch((err) => {
      console.log("The rent could not be deleted", err);
      res.status(400).json(err);
    });
}

module.exports = {
  createRent,
  getAllRents,
  getRentById,
  updateRent,
  deleteRent,
};
