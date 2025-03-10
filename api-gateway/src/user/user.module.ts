import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../../proto/user.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
    RoleModule,
  ],
  providers: [UserResolver, UserService],
})
export class UserModule {}
