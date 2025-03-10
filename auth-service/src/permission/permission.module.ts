import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from 'src/schema/permission.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://azam:azam@cluster0.vgsmn.mongodb.net/test-pr',
    ), // MongoDB URL
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
