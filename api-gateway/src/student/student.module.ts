import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'student',
          protoPath: join(__dirname, '../../../proto/school.proto'),
          url: 'localhost:50056',
        },
      },
    ]),
  ],
  providers: [StudentService, StudentResolver],
  exports: [StudentService],
})
export class SchoolModule {}
