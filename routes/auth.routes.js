const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const authRequired = require("../middlewares/validateToken");

router.post("/register", authController.register);

router.post("/login", authController.login);

router.post("/logout", authController.logout);

router.post("/verify", authController.verifyToken);

router.get("/profile", authRequired, authController.profile);

router.put("/profile/update", authRequired, authController.updateProfile);

router.get("/users", authController.getAllUsers);

router.get("/:id", authController.getUserById);

router.put("/update/:id", authController.updateUser);

router.delete("/delete/:id", authController.deleteUser);


module.exports = router;
