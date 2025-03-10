import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../schema/role.schema';
import { RoleService } from './role.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://azam:azam@cluster0.vgsmn.mongodb.net/test-pr',
    ), // MongoDB URL
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
