import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { StudentModule } from './student.module';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(StudentModule, {
    transport: Transport.GRPC,
    options: {
      package: 'student',
      protoPath: join(__dirname, '../../proto/student.proto'),
      url: 'localhost:50056', // User Service চলবে পোর্ট 50051-এ
    },
  });
  await app.listen();
}
bootstrap();
