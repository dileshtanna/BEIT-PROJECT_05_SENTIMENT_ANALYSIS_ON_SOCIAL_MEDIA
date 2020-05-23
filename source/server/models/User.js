const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
