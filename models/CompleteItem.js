const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  dateCompleted: {
    type: Date,
    default: Date.now
  },
  dateCreated: {
    type: Date,
    required: true
  }
});

module.exports = CompleteItem = mongoose.model(
    "completeItems",
    itemSchema,
    "complete");
