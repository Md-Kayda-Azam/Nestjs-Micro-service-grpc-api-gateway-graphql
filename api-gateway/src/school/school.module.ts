import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolResolver } from './school.resolver';

@Module({
  providers: [SchoolResolver, SchoolService],
})
export class SchoolModule {}
