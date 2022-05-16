var express = require("express");
var router = express.Router();
const Post = require("../models/postModel");
const handleSuccess = require("../services/handleSuccess");
const handleError = require("../services/handleError");

// const {
//   getPosts,
//   createPosts,
//   deleteAllPosts,
//   deletePost,
//   editPost,
// } = require("../controllers/post");
const PostControllers = require("../controllers/post");

router.get("/", PostControllers.getPosts);
router.post("/", PostControllers.createPosts);
router.delete("/", PostControllers.deleteAllPosts);
router.delete("/:id", (req, res) => {
  /**
   *  #swagger.tags = ['Posts-貼文']
   */
  const id = req.params.id;
  PostControllers.deletePost(id, res);
});
router.patch("/:id", (req, res) => {
  /**
   *  #swagger.tags = ['Posts-貼文']
   */
  const id = req.params.id;
  PostControllers.editPost(req, res, id);
});
router.options("/", PostControllers.cors);

//todo: 404

// /* GET users listing. */
// router.get("/", async function (req, res, next) {
//   await handleSuccess(res);
// });

// router.post("/", async function (req, res, next) {
//   try {
//     if (!req.body.name || !req.body.content) {
//       handleError(res);
//       return;
//     }
//     await Post.create({
//       name: req.body.name,
//       content: req.body.content,
//       image: req.body.image || "",
//     });
//     handleSuccess(res, "成功新增一筆貼文");
//   } catch (err) {
//     console.log("err", err);
//     handleError(res, 400, err);
//   }
// });

// router.delete("/", async function (req, res, next) {
//   await Post.deleteMany({});
//   handleSuccess(res, "成功刪除全部資料");
// });

// router.delete("/:id", async function (req, res, next) {
//   console.log(req.params.id);
//   res.status(200).json({
//     status: true,
//   });
// });

// router.patch("/:id", async function (req, res, next) {
//   res.status(200).json({
//     status: true,
//   });
// });

module.exports = router;
