const express = require("express")
const router = express.Router()
const messagesController = require("../../controllers/messages")
router.post("/", messagesController.createMessage)

module.exports = router
