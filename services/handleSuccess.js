const Post = require("../models/postModel");

const handleSuccess = async (res, msg) => {
  if (msg != "options") {
    res.status(200).json({
      status: true,
      msg,
      posts: await Post.find({}),
    });
  }
};
module.exports = handleSuccess;
