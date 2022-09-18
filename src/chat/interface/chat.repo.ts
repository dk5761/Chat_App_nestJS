

export default interface ChatRepository {

    createConversation(user1Id: string, user2Id: string);
    deleteConveration(user1Id: string, user2Id: string);

    getConversation(user1Id: string, user2Id: string);

    saveMessage(author_Id, conversationId, attachment);
    deleteMessage(messageId: string);

    getAllMessages(conversationId: string);

}