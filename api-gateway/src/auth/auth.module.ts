import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { RoleModule } from 'src/role/role.module';
import { ClientsModule } from 'src/clients.module';
// import { AuthGuard } from './guards/auth.guard';
@Module({
  imports: [ClientsModule, RoleModule],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
