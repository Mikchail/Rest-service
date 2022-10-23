
const сonversationService = require("../service/conversations-service");

class ConversationControllers {
  
  async createConversation(req, res, next) {
    try {
      const { messages, ownerID, guestID } = req.body;
      const newConversation = await сonversationService.createConversation(messages, ownerID, guestID);
      return res.json(newConversation);
    } catch (err) {
      next(err);
    }
  }

  async getConversations(req, res, next) {
    try {
      const сonversations = await сonversationService.getConversations();
      return res.json(сonversations);
    } catch (err) {
      next(err);
    }
  }

  async updateConversation(req, res, next) {
    const { conversationId, messages } = req.body;
    try {
      const updateConversation = await сonversationService.updateConversation(conversationId, messages);
      return res.json(updateConversation)
    } catch (err) {
      next(err);
    }
  }

  // async deletePost(req, res, next) {
  //   const { postId } = req.body;
  //   try {
  //     const deletedPost = await postService.deletePost(postId);
  //     return res.json(deletedPost);
  //   } catch (err) {
  //     next(err);
  //   }
  // }



}
module.exports = new ConversationControllers();