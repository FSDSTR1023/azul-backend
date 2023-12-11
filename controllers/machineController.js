const Machine = require("../models/machine.model");

async function createMachine(req, res) {
  Machine.create(req.body)
    .then((machine) => {
      console.log("machine created successfully", machine);
      res.status(200).json(machine);
    })
    .catch((err) => {
      console.log(err, "Something went wrong when creating a new machine");
      res.status(400).json(err);
    });
}

async function getAllMachines(req, res) {
  Machine.find()
    .then((machine) => {
      console.log("machines found", machine);
      res.status(200).json(machine);
    })
    .catch((err) => {
      console.log(err, "Something went wrong when fetching all machines");
      res.status(400).json(err);
    });
}

async function getMachineById(req, res) {
  Machine.findById(req.params.id)
    .then((machine) => {
      console.log("Machine found by ID: ", machine);
      res.status(200).json(machine);
    })
    .catch((err) => {
      console.log("Machine ID not found", err);
      res.status(400).json(err);
    });
}

async function updateMachine(req, res) {
  Machine.findByIdAndUpdate(
    req.params.id,
    req.body,
    { upsert: true },
    { new: true }
  )
    .then((machine) => {
      console.log("The machine has been updated: ", machine);
      res.status(200).json(machine);
    })
    .catch((err) => {
      console.log("The machine was not updated", err);
      res.status(400).json(err);
    });
}

async function deleteMachine(req, res) {
  Machine.findByIdAndDelete(req.params.id)
    .then((machine) => {
      console.log("The machine has been deleted", machine);
      res.status(200).json(machine);
    })
    .catch((err) => {
      console.log("The machine could not be deleted", err);
      res.status(400).json(err);
    });
}

module.exports = {
  createMachine,
  getAllMachines,
  getMachineById,
  updateMachine,
  deleteMachine,
};
