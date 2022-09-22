

export default interface IChatRepository {

    createConversation(user1Id: string, user2Id: string);
    deleteConversation(user1Id: string, user2Id: string);

    getConversation(user1Id: string, user2Id: string);

    saveMessage(author_Id: string, conversationId: string, text: string, attachment);
    deleteMessage(messageId: string);

    getAllMessages(conversationId: string);

}