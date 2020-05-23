const express = require("express")
const router = express.Router()
const groupsController = require("../../controllers/groups")

router.post("/", groupsController.createGroup)
router.get("/self", groupsController.getOwnGroups)

module.exports = router
