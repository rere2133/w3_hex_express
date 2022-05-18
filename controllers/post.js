const handleSuccess = require("../services/handleSuccess");
const handleError = require("../services/handleError");
const Post = require("../models/postModel");

const posts = {
  async getPosts(req, res) {
    try {
      await handleSuccess(res);
    } catch {
      handleError(res);
    }
  },
  async createPosts(req, res) {
    try {
      const data = req.body;
      if (data.name && data.content) {
        await Post.create({
          name: data.name,
          content: data.content,
          image: data.image || "",
          tags: data.tags || [],
        });
        await handleSuccess(res, "新增成功");
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, 400, err.message);
    }
  },
  async deleteAllPosts(req, res) {
    try {
      await Post.deleteMany({});
      await handleSuccess(res);
    } catch {
      handleError(res);
    }
  },
  async deletePost(req, res) {
    try {
      console.log(req.originalUrl);
      const id = req.params.id;
      let deletePost = await Post.findByIdAndDelete(id);
      if (deletePost != null) {
        await handleSuccess(res, "成功刪除一筆");
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res);
    }
  },
  async editPost(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      console.log({ data });
      if (data.name && data.content) {
        let editedPost = await Post.findByIdAndUpdate(
          id,
          {
            name: data.name,
            content: data.content,
            image: data.image || "",
            tags: data.tags || [],
          },
          { runValidators: true }
        );
        if (editedPost !== null) {
          await handleSuccess(res, "成功更新一筆");
        } else {
          handleError(res);
        }
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, 400, err.message);
    }
  },
  cors(req, res) {
    handleSuccess(res, "options");
  },
};
module.exports = posts;
