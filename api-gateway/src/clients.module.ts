// clients.module.ts
import { Module } from '@nestjs/common';
import {
  ClientsModule as NestClientsModule,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    NestClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../proto/user.proto'),
          url: 'localhost:50051',
        },
      },
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../../proto/auth.proto'),
          url: 'localhost:50052',
        },
      },
      {
        name: 'PERMISSION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'permission',
          protoPath: join(__dirname, '../../proto/permission.proto'),
          url: 'localhost:50053',
        },
      },
      {
        name: 'ROLE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'role',
          protoPath: join(__dirname, '../../proto/role.proto'),
          url: 'localhost:50054',
        },
      },
      {
        name: 'SCHOOL_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'school',
          protoPath: join(__dirname, '../../proto/school.proto'),
          url: 'localhost:50055',
        },
      },
      {
        name: 'STUDENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'student',
          protoPath: join(__dirname, '../../proto/student.proto'),
          url: 'localhost:50056',
        },
      },
      {
        name: 'TEACHER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'teacher',
          protoPath: join(__dirname, '../../proto/teacher.proto'),
          url: 'localhost:50057',
        },
      },
      {
        name: 'PARENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'parent',
          protoPath: join(__dirname, '../../proto/parent.proto'),
          url: 'localhost:50058',
        },
      },
      {
        name: 'PAYMENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'payment',
          protoPath: join(__dirname, '../../proto/payment.proto'),
          url: 'localhost:50059',
        },
      },
    ]),
  ],
  exports: [NestClientsModule],
})
export class ClientsModule {}
