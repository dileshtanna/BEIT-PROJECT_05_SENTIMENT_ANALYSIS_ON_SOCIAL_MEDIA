const express = require("express");
const router = express.Router();
const signUpController = require("../../controllers/sign-up");

router.post("/", signUpController.signUp);

module.exports = router;
