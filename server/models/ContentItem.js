const mongoose = require("mongoose");

const ContentItemSchema = mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  birthtimeMs: {
    type: Number,
    required: true
  },
  uploaderName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("contentItem", ContentItemSchema);
