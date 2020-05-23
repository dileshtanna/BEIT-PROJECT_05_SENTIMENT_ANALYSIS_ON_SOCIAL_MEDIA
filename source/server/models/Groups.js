const mongoose = require("mongoose")
const Schema = mongoose.Schema

const GroupsSchema = new Schema({
  admin: {
    type: String,
    required: true
  },
  created_on: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  selected_participants: {
    type: [String],
    required: true
  }
})

const GroupsModel = mongoose.model("groups", GroupsSchema)

module.exports = GroupsModel
