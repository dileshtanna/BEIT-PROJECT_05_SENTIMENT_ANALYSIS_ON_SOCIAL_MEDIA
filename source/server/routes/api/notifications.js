const express = require("express")
const router = express.Router()
const notificationsController = require("../../controllers/notifications")
router.get("/", notificationsController.getNotifications)

module.exports = router
