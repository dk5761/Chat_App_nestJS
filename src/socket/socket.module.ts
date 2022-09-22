import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SocketRepository } from './repo/socket.repo';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';

@Module({
  controllers: [SocketController],
  providers: [SocketService, SocketRepository, PrismaService],
  exports: [SocketService]
})
export class SocketModule { }
