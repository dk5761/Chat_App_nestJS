import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
  });

  app.enableCors();
  // app.use(csurf);



  await app.listen(3000);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
}
bootstrap();
