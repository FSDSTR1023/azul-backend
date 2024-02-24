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
  const { id } = req.params;
  const update = req.body;

  try {
    const updatedDocument = await Machine.findByIdAndUpdate(id, update, { new: true, upsert: true });
    res.json(updatedDocument); 
  } catch (error) {
    res.status(500).json({ message: 'Error updating machine', error: error.message });
  }
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

async function machineState(req, res) {
  const { id } = req.params;
  const { state } = req.body;
  try {
    const machineDisabled = await Machine.findByIdAndUpdate(
      id,
      { state: state },
      { new: true }
    );

    if (!machineDisabled) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(machineDisabled);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createMachine,
  getAllMachines,
  getMachineById,
  updateMachine,
  machineState,
  deleteMachine,
};
