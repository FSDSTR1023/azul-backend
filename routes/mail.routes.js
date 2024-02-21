const express = require("express");
const router = express.Router();

const MailController = require("../controllers/mailController");

const mailController = new MailController();

router.post("/", mailController.sendEmail.bind(mailController));
router.post("/template", mailController.sendEmailTemplate.bind(mailController));

module.exports = router;