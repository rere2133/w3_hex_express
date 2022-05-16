const handleSuccess = require("../services/handleSuccess");
const handleError = require("../services/handleError");
const Post = require("../models/postModel");

const posts = {
  async getPosts(req, res) {
    /**
      *  #swagger.tags = ['Posts-貼文']
      *  #swagger.description = '取得全部貼文'
      *  #swagger.responses[200]={
            description: '回應成功的API格式',
            schema: {
              "status": true,
              "posts": [
                {
                  "_id": "627f5d9acc51eacb318ead73",
                  "name": "拿鐵",
                  "content": "不喜歡美式，只愛冰拿鐵，一天精神糧食",
                  "image": "https://hello.com",
                  "tags": [
                    "coffee",
                    "咖啡",
                    "ya"
                  ],
                  "likes": 0
                }
              ]
            }
        }
     *
     */
    await handleSuccess(res);
  },
  async createPosts(req, res) {
    /**
     *  #swagger.tags = ['Posts-貼文']
     *  #swagger.description = '新增一則貼文'
     *  #swagger.parameters['body']={
          "in": "body",
          "description": "資料格式",
          "required": true,
          "schema":{
            "$name" : "Reckie",
            "$tags" : "你好",
            "$content": "這是一則貼文"
          }
        }
     *  #swagger.responses[200]={
            description: '回應成功的API格式',
            schema: {
              "status": true,
              "msg": "新增成功",
              "posts": [
                {
                  "_id": "627f5d9acc51eacb318ead73",
                  "name": "拿鐵",
                  "content": "不喜歡美式，只愛冰拿鐵，一天精神糧食",
                  "image": "https://hello.com",
                  "tags": [
                    "coffee",
                    "咖啡",
                    "ya"
                  ],
                  "likes": 0
                }
              ]
            }
        }
     *
     */
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
    /**
     *  #swagger.tags = ['Posts-貼文']
     */
    await Post.deleteMany({});
    await handleSuccess(res);
  },
  async deletePost(id, res) {
    await Post.findByIdAndDelete(id);
    await handleSuccess(res, "成功刪除一筆");
  },
  async editPost(req, res, id) {
    try {
      const data = req.body;
      console.log({ data });
      if (data.name && data.content) {
        let editedPost = await Post.findByIdAndUpdate(id, {
          name: data.name,
          content: data.content,
          image: data.image || "",
          tags: data.tags || [],
        });
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
    /**
     *  #swagger.ignore = true
     */
    handleSuccess(res, "options");
  },
};
module.exports = posts;
