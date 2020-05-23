const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostsSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  postTitle: {
    type: String,
    required: true
  },
  group: {},
  post: {
    type: String,
    required: true
  },
  selected_participants: {
    type: [String],
    required: true
  },
  compulsory_action: {
    type: Boolean,
    required: false
  },
  likes: { type: [String], required: true },
  intensity: {
    type: String,
    required: true
  }
})

const PostsModel = mongoose.model("posts", PostsSchema)

module.exports = PostsModel
