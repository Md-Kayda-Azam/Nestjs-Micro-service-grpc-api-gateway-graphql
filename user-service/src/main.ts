import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { UserModule } from './user.module';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../../proto/user.proto'),
      url: 'localhost:50051', // User Service চলবে পোর্ট 50051-এ
    },
  });
  await app.listen();
}
bootstrap();
