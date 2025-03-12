import { Module, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { APP_PIPE, APP_GUARD, APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { ValidationError } from 'class-validator';
import { PermissionModule } from 'src/permission/permission.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { RoleModule } from 'src/role/role.module';
import { SchoolModule } from 'src/school/school.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { ParentModule } from 'src/parent/parent.module';
import { SharedModule } from 'src/shared/guards/shared.module';
import { RedisService } from 'src/shared/guards/redis.service';
import { GlobalGuard } from 'src/shared/guards/global.guard.module';
import { GraphQLExceptionFilter } from 'src/graphql-exception.filter';
import { StudentModule } from './student/student.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { PermissionGuard } from './shared/guards/permission.guard';
import { ClientsModule } from './clients.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    ClientsModule,
    UserModule,
    AuthModule,
    PermissionModule,
    RoleModule,
    SchoolModule,
    StudentModule,
    TeacherModule,
    ParentModule,
    SharedModule,
    PaymentModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: GlobalGuard },
    { provide: APP_FILTER, useClass: GraphQLExceptionFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        exceptionFactory: (errors: ValidationError[]) => {
          const messages = errors
            .filter((err) => err.constraints)
            .map((err) => Object.values(err.constraints!).join(', '))
            .join('; ');
          throw new GraphQLError(messages || 'Invalid input data', {
            extensions: { code: 'BAD_REQUEST' },
          });
        },
      }),
    },
    AuthGuard, // AuthGuard যোগ
    PermissionGuard, // PermissionGuard যোগ
    RedisService,
  ],
  // exports: [ClientsModule],
})
export class AppModule {}
