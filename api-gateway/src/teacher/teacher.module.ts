import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TeacherService } from './teacher.service';
import { TeacherResolver } from './teacher.resolver';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TEACHER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'teacher',
          protoPath: join(__dirname, '../../../proto/teacher.proto'),
          url: 'localhost:50056',
        },
      },
    ]),
  ],
  providers: [TeacherService, TeacherResolver],
  exports: [TeacherService],
})
export class SchoolModule {}
