import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.use(cookieParser());

  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:5173',
    credentials: true,
  });

  const PORT = configService.get('PORT');
  console.log(`Service Product on port: ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
