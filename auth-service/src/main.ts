import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: ['auth', 'role', 'permission'], // একাধিক প্যাকেজ
      protoPath: [
        join(__dirname, '../../proto/auth.proto'),
        join(__dirname, '../../proto/role.proto'),
        join(__dirname, '../../proto/permission.proto'),
      ],
      url: 'localhost:50052',
    },
  });
  await app.listen();
}
bootstrap();
