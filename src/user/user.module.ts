import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './repo/user.repo';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService]
})
export class UserModule { }
