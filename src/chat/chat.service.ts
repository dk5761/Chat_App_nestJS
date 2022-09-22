import { Injectable } from '@nestjs/common';
import { ChatRepository } from './repo/chat.repo';

@Injectable()
export class ChatService {

    constructor(
        private chatRepo: ChatRepository
    ) { }


    async createConversation(user1Id: string, user2Id: string) {
        return await this.chatRepo.createConversation(user1Id, user2Id);
    }

    async deleteConversation(user1Id: string, user2Id: string) {
        return await this.chatRepo.deleteConversation(user1Id, user2Id);
    }

    async getConversationOrCreateConversation(user1Id: string, user2Id: string) {


        var check = await this.chatRepo.getConversation(user1Id, user2Id);
        if (!check) {
            check = await this.chatRepo.getConversation(user2Id, user1Id);

            if (!check) {
                return await this.chatRepo.createConversation(user1Id, user2Id);
            }
        }


        return check;
    }

    async saveMessage(author_Id: any, conversationId: any, text, attachment: any) {
        return await this.chatRepo.saveMessage(author_Id, conversationId, text, attachment);
    }

    async deleteMessage(messageId: string) {
        return await this.chatRepo.deleteMessage(messageId);
    }

    async getAllMessage(conversationId) {
        return await this.chatRepo.getAllMessages(conversationId);
    }

}
