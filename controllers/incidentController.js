const Incident = require("../models/incident.model");

async function createIncident(req, res) {
  Incident.create(req.body)
    .then((incident) => {
      console.log("incident created successfully", incident);
      res.status(200).json(incident);
    })
    .catch((err) => {
      console.log(err, "Something went wrong when creating a new incident");
      res.status(400).json(err);
    });
}

async function getAllIncidents(req, res) {
  Incident.find()
    .then((incident) => {
      console.log("incidents found", incident);
      res.status(200).json(incident);
    })
    .catch((err) => {
      console.log(err, "Something went wrong when fetching all incidents");
      res.status(400).json(err);
    });
}

async function getIncidentById(req, res) {
  Incident.findById(req.params.id)
    .then((incident) => {
      console.log("Incident found by ID: ", incident);
      res.status(200).json(incident);
    })
    .catch((err) => {
      console.log("Incident ID not found", err);
      res.status(400).json(err);
    });
}

async function updateIncident(req, res) {
  Incident.findByIdAndUpdate(
    req.params.id,
    req.body,
    { upsert: true },
    { new: true }
  )
    .then((incident) => {
      console.log("The incident has been updated: ", incident);
      res.status(200).json(incident);
    })
    .catch((err) => {
      console.log("The incident was not updated", err);
      res.status(400).json(err);
    });
}

async function deleteIncident(req, res) {
  Incident.findByIdAndDelete(req.params.id)
    .then((incident) => {
      console.log("The incident has been deleted", incident);
      res.status(200).json(incident);
    })
    .catch((err) => {
      console.log("The incident could not be deleted", err);
      res.status(400).json(err);
    });
}

module.exports = {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
};
