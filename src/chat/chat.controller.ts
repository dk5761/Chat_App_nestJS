import { Body, Controller, HttpStatus, Logger, Post, Req, Request, Res, UseGuards, Get } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guards';
import { ChatService } from './chat.service';
import { ConversationDTO } from './dto/conversationDto';

@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService) { }

    private logger: Logger = new Logger('Chat Controller');


    @UseGuards(JwtAuthGuard)
    @Post('/conversation')
    async getConversation(@Body() body: ConversationDTO) {
        var conversation = await this.chatService.getConversationOrCreateConversation(body.user1, body.user2)
        return conversation;
    }

}
