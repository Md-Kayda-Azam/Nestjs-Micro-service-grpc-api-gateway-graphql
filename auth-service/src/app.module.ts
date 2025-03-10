import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [AuthModule, RoleModule, PermissionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
