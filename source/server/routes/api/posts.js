const express = require("express")
const router = express.Router()
const postsController = require("../../controllers/posts")

router.get("/all/user", postsController.getAllPostsFromUser)

router.post("/new", postsController.createPost)

router.get("/all", postsController.getAllPosts)

router.get("/one/:id", postsController.getSinglePost)

router.put("/like/:id", postsController.likeAction)

module.exports = router
