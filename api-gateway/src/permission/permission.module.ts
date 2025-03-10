import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { PermissionGuard } from 'src/shared/guards/permission.guard';
import { RedisService } from 'src/shared/guards/redis.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PERMISSION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'permission',
          protoPath: join(__dirname, '../../../proto/permission.proto'),
          url: 'localhost:50052', // gRPC সার্ভারের URL
        },
      },
      // {
      //   name: 'ROLE_PACKAGE',
      //   transport: Transport.GRPC,
      //   options: {
      //     package: 'role',
      //     protoPath: join(__dirname, '../../../proto/role.proto'),
      //     url: 'localhost:50052', // gRPC সার্ভারের URL
      //   },
      // },
    ]),
  ],
  providers: [
    PermissionResolver,
    PermissionService,
    // PermissionGuard, // PermissionGuard প্রোভাইডার হিসেবে
    // RedisService, // RedisService প্রোভাইডার হিসেবে
  ],
  exports: [
    PermissionService,
    // PermissionGuard, // PermissionGuard এক্সপোর্ট করা
    // RedisService, // RedisService এক্সপোর্ট করা
  ],
})
export class PermissionModule {}
