import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentResolver } from './parent.resolver';
import { ClientsModule } from 'src/clients.module';

@Module({
  imports: [ClientsModule],
  providers: [ParentService, ParentResolver],
  exports: [ParentService],
})
export class ParentModule {}
