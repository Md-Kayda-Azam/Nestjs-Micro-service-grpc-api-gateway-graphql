import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ParentService } from './parent.service';
import { ParentResolver } from './parent.resolver';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PARENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'parent',
          protoPath: join(__dirname, '../../../proto/parent.proto'),
          url: 'localhost:50057',
        },
      },
    ]),
  ],
  providers: [ParentService, ParentResolver],
  exports: [ParentService],
})
export class SchoolModule {}
