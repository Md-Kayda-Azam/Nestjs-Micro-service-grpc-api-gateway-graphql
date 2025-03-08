import { NestFactory } from '@nestjs/core';
import { RoleModule } from './role.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(RoleModule, {
    transport: Transport.GRPC,
    options: {
      package: 'role',
      protoPath: join(__dirname, '../../proto/role.proto'),
      url: 'localhost:50054', // User Service চলবে পোর্ট 50051-এ
    },
  });
  await app.listen();
}
bootstrap();
