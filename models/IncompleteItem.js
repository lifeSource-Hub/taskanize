const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
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

module.exports = IncompleteItem = mongoose.model(
    "incompleteItems",
    itemSchema,
    "incomplete");
