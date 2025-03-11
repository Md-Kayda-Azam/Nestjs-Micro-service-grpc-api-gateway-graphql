import { Module } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { SharedModule } from 'src/shared/guards/shared.module';
import { ClientsModule } from 'src/clients.module';

@Module({
  imports: [ClientsModule, SharedModule],
  providers: [PermissionResolver, PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
