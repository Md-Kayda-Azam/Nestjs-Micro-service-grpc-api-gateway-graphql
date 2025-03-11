import { Module } from '@nestjs/common';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
import { SharedModule } from 'src/shared/guards/shared.module';
import { ClientsModule } from 'src/clients.module';

@Module({
  imports: [SharedModule, ClientsModule],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
