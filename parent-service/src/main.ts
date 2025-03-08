import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { ParentModule } from './parent.module';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ParentModule, {
    transport: Transport.GRPC,
    options: {
      package: 'parent',
      protoPath: join(__dirname, '../../proto/parent.proto'),
      url: 'localhost:50058', // User Service চলবে পোর্ট 50051-এ
    },
  });
  await app.listen();
}
bootstrap();
