const express = require("express")
const router = express.Router()
const usersController = require("../../controllers/users")
const admin = require("../../middleware/admin")

router.get("/all", admin, usersController.getAllUsers)

router.get("/posts/:username", usersController.getSingleUserPosts)

router.get("/score/:username", admin, usersController.getUserScore)

module.exports = router
