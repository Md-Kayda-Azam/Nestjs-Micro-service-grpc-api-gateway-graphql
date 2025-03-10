import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Role, RoleSchema } from '../schema/role.schema';
import { Permission, PermissionSchema } from '../schema/permission.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://azam:azam@cluster0.vgsmn.mongodb.net/test-pr',
    ), // MongoDB URL
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
