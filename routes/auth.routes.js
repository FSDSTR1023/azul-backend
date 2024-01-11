const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const authRequired = require("../middlewares/validateToken");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/verify", authController.verifyToken);

router.get("/profile", authRequired, authController.profile);

module.exports = router;
