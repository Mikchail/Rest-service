
const postService = require("../service/post-service");

class PostControllers {

  async createPost(req, res, next) {
    try {
      const { title, description, author } = req.body;
      const newPost = await postService.createPost(title, description, author);
      return res.json(newPost);
    } catch (err) {
      next(err);
    }
  }

  async getPosts(req, res, next) {
    console.log(req.query)
    try {
      const posts = await postService.getPosts(req.query);
      return res.json(posts);
    } catch (err) {
      next(err);
    }
  }

  async updatePost(req, res, next) {
    const { title, description, postId } = req.body;
    try {
      const updatedPost = await postService.updatePost(postId, title, description);
      return res.json(updatedPost)
    } catch (err) {
      next(err);
    }
  }

  async deletePost(req, res, next) {
    const { postId } = req.body;
    try {
      const deletedPost = await postService.deletePost(postId);
      return res.json(deletedPost);
    } catch (err) {
      next(err);
    }
  }



}
module.exports = new PostControllers();