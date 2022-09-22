import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './socket/socket';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

import { SocketModule } from './socket/socket.module';
import { SocketRepository } from './socket/repo/socket.repo';
import { SocketService } from './socket/socket.service';
import { PrismaService } from './prisma.service';


@Module({
  imports: [AuthModule, UserModule, ChatModule, SocketModule],
  controllers: [],
  providers: [ChatGateway, SocketService, SocketRepository, PrismaService],
})
export class AppModule { }
