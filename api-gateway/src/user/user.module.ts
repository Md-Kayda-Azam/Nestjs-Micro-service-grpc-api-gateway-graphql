import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { RoleModule } from 'src/role/role.module';
import { ClientsModule } from 'src/clients.module';

@Module({
  imports: [ClientsModule, RoleModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
