const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date,
    default: Date.now
  },
  dateCompleted: {
    type: Date,
    default: null
  }
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  list: [listSchema]
});

module.exports = Users = mongoose.model(
    "users",
    userSchema,
    "users");
