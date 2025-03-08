import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Parent, ParentSchema } from './schema/parent.schema';
import { ParentController } from './parent.controller';
import { ParentService } from './parent.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://azam:azam@cluster0.vgsmn.mongodb.net/test-pr',
    ), // MongoDB URL
    MongooseModule.forFeature([{ name: Parent.name, schema: ParentSchema }]),
  ],
  controllers: [ParentController],
  providers: [ParentService],
})
export class ParentModule {}
