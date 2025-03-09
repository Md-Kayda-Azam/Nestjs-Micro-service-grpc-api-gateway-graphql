import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SchoolService } from './school.service';
import { SchoolResolver } from './school.resolver';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SCHOOL_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'school',
          protoPath: join(__dirname, '../../../proto/school.proto'),
          url: 'localhost:50055',
        },
      },
    ]),
  ],
  providers: [SchoolService, SchoolResolver],
  exports: [SchoolService],
})
export class SchoolModule {}
