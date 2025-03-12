import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { PaymentModule } from './payment.module';

// Load environment variables from .env file
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PaymentModule, {
    transport: Transport.GRPC,
    options: {
      package: 'payment',
      protoPath: join(__dirname, '../../proto/payment.proto'),
      url: 'localhost:50059', // User Service চলবে পোর্ট 50051-এ
    },
  });
  await app.listen();
}
bootstrap();
