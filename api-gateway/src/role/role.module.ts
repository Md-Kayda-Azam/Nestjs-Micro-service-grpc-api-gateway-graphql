import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { join } from 'path';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ROLE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'role',
          protoPath: join(__dirname, '../../../proto/role.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
    PermissionModule,
  ],
  providers: [RoleService, RoleResolver],
  exports: [RoleService],
})
export class RoleModule {}
