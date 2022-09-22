import { Module } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guards';
import { PrismaService } from 'src/prisma.service';
import { UserRepository } from './repo/user.repo';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService, JwtAuthGuard],
  exports: [UserService]
})
export class UserModule { }
