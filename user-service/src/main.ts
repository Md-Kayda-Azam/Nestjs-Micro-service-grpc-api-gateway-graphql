import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
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
