import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { join } from 'path';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'student',
          protoPath: join(__dirname, '../../../proto/student.proto'),
          url: 'localhost:50056',
        },
      },
    ]),
  ],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
