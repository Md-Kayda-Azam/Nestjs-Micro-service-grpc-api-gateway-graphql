import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { SchoolModule } from './school.module';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(SchoolModule, {
    transport: Transport.GRPC,
    options: {
      package: 'school',
      protoPath: join(__dirname, '../../proto/school.proto'),
      url: 'localhost:50055', // User Service চলবে পোর্ট 50051-এ
    },
  });
  await app.listen();
}
bootstrap();
