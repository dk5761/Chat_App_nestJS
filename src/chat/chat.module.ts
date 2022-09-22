import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './repo/chat.repo';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, PrismaService],
  exports: [ChatService]
})
export class ChatModule { }
