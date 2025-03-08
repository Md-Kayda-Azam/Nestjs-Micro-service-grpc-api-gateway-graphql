import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { TeacherModule } from './teacher.module';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TeacherModule, {
    transport: Transport.GRPC,
    options: {
      package: 'teacher',
      protoPath: join(__dirname, '../../proto/teacher.proto'),
      url: 'localhost:50057', // User Service চলবে পোর্ট 50051-এ
    },
  });
  await app.listen();
}
bootstrap();
