const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "名稱尚未填寫"],
    },
    content: {
      type: String,
      required: [true, "貼文尚未填寫"],
    },
    image: {
      type: String,
      default: "",
    },
    tags: [
      {
        type: String,
        default: "",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    createAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
