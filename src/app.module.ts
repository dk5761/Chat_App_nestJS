import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './gateway/socket';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, UserModule, ChatModule],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule { }
