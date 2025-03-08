import { NestFactory } from '@nestjs/core';
import { PermissionModule } from './permission.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PermissionModule, {
    transport: Transport.GRPC,
    options: {
      package: 'permission',
      protoPath: join(__dirname, '../../proto/permission.proto'),
      url: 'localhost:50053', // User Service চলবে পোর্ট 50051-এ
    },
  });
  await app.listen();
}
bootstrap();
