import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import IChatRepository from "../interface/chat.repo";

@Injectable()
export class ChatRepository implements IChatRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async createConversation(user1Id: string, user2Id: string) {

        return await this.prisma.conversation.create({
            data: {
                user1: user1Id,
                user2: user1Id,
            }
        })
    }

    async deleteConversation(user1Id: string, user2Id: string) {
        const conversation = await this.getConversation(
            user1Id,
            user2Id,
        );

        return await this.prisma.conversation.delete({
            where: {
                id: conversation.id
            }
        })

    }

    async getConversation(user1Id: string, user2Id: string) {
        return await this.prisma.conversation.findFirst({
            where: {
                user1: user1Id,
                user2: user2Id,
            }
        });
    }

    async saveMessage(author_Id: any, conversationId: any, text, attachment: any) {
        const conversation = await this.prisma.conversation.findUnique({ where: { id: conversationId } });
        console.log(text)
        return await this.prisma.message.create({
            data: {
                author_id: author_Id,
                text: text,
                conversationId,
            }
        })

    }

    async deleteMessage(messageId: string) {
        return await this.prisma.message.delete({
            where: {
                id: messageId
            }
        })
    }

    async getAllMessages(conversationId: string) {
        return await this.prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
        })
    }

}