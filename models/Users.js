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
  dateModified: {
    type: Date,
    default: Date.now
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true
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
