import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { PermissionModule } from 'src/permission/permission.module';
import { ClientsModule } from 'src/clients.module';

@Module({
  imports: [ClientsModule, PermissionModule],
  providers: [RoleService, RoleResolver],
  exports: [RoleService],
})
export class RoleModule {}
