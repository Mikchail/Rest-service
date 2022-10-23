const ApiError = require("../exeptions/ApiError");
const ConversationModel = require("../models/Conversations");
const UserModel = require("../models/User");

class ConversationService {

    async createConversation(messages, ownerID, guestID) {
        const conversation = await ConversationModel.create({ members: [ownerID, guestID], messages, ownerID });
        const user = await UserModel.findById(ownerID);
        user.posts.push(post.id)
        user.save();
        return conversation;
    }

    async getConversations() {
        // const posts = await ConversationModel.find({title: {$regex: title}, description: {$regex: description} });
        const conversation = await ConversationModel.find({});
        return conversation;
    }

    async updateConversation(conversationId, messages) {
        if (!conversationId || !messages.length) {
            throw ApiError.BadRequest("Введите все поля!");
        }
        const conversations = await ConversationModel.findOneAndUpdate(
          { _id: conversationId },
          {
            $set: {
              messages,
            },
          },
          { new: true }
        );
        return conversations;
    }

    // async deletePost(postId) {
    //     const deletedPost = await PostModel.findByIdAndDelete({ _id: postId });
    //     return deletedPost;
    // }


}

module.exports = new ConversationService();