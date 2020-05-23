const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  created_on: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  broadcast: {
    type: String,
    required: true
  },
  selected_participants: {
    type: [String],
    required: true
  },
  group: {
    type: String,
    required: false
  }
})

const MessageModel = mongoose.model("messages", MessageSchema)

module.exports = MessageModel
