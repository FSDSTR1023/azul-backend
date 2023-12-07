const express = require("express");
const router = express.Router();

const userClienteController = require("../controllers/userClienteController");

router.post("/", userClienteController.createUserCliente);

router.get("/", userClienteController.getAllUsersCliente);

router.get("/:id", userClienteController.getUserClienteById);

router.put("/:id", userClienteController.updateUserCliente);

router.delete("/:id", userClienteController.deleteUserCliente);

module.exports = router;
