const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  writter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("Post", PostSchema);
