const ApiError = require("../exeptions/ApiError");
const PostModel = require("../models/Post");
const UserModel = require("../models/User");

class PostService {

    async createPost(title, description, author) {
        const post = await PostModel.create({ title, description, author });
        const user = await UserModel.findById(author);
        user.posts.push(post.id)
        user.save();
        return post;
    }

    async getPosts(filter) {
        const { title = "" , description = "" } = filter;
        const posts = await PostModel.find({title: {$regex: title}, description: {$regex: description} });
        return posts;
    }

    async updatePost(postId, title, description) {
        if (!title || !description || !postId) {
            throw ApiError.BadRequest("Введите все поля!");
        }
        const posts = await PostModel.findOneAndUpdate({ _id: postId },
            {
                $set: {
                    title,
                    description
                },
            },
            { new: true }
        );
        return posts;
    }

    async deletePost(postId) {
        const deletedPost = await PostModel.findByIdAndDelete({ _id: postId });
        return deletedPost;
    }


}

module.exports = new PostService();