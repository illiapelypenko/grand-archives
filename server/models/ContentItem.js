const mongoose = require("mongoose");

const ContentItem = mongoose.Schema({
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
  },
  rating: {
    type: String
  }
});

module.exports = mongoose.model("contentItem", ContentItem);
