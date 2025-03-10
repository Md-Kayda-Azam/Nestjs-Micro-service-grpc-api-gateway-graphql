import { Module, ValidationPipe } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { APP_PIPE, APP_GUARD, APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { ValidationError } from 'class-validator';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { SchoolModule } from './school/school.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { ParentModule } from './parent/parent.module';
import { GraphQLExceptionFilter } from './graphql-exception.filter';
import { AuthGuard } from './shared/guards/auth.guard';
import { RedisService } from './shared/guards/redis.service';
import { PermissionService } from './permission/permission.service';
import { PermissionGuard } from './shared/guards/permission.guard';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // GraphQL Playground সক্রিয় করা (ডেভেলপমেন্টের জন্য)
      context: ({ req }) => ({ req }), // রিকোয়েস্ট কনটেক্সটে পাঠানো
    }),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../proto/user.proto'),
          url: 'localhost:50051',
        },
      },
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname, '../../proto/auth.proto'),
          url: 'localhost:50052',
        },
      },
      {
        name: 'PERMISSION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'permission',
          protoPath: join(__dirname, '../../proto/permission.proto'),
          url: 'localhost:50052',
        },
      },
      {
        name: 'ROLE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'role',
          protoPath: join(__dirname, '../../proto/role.proto'),
          url: 'localhost:50052',
        },
      },
      {
        name: 'SCHOOL_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'school',
          protoPath: join(__dirname, '../../proto/school.proto'),
          url: 'localhost:50055',
        },
      },
      {
        name: 'STUDENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'student',
          protoPath: join(__dirname, '../../proto/student.proto'),
          url: 'localhost:50056',
        },
      },
      {
        name: 'TEACHER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'teacher',
          protoPath: join(__dirname, '../../proto/teacher.proto'),
          url: 'localhost:50057',
        },
      },
      {
        name: 'PARENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'parent',
          protoPath: join(__dirname, '../../proto/parent.proto'),
          url: 'localhost:50058',
        },
      },
    ]),
    UserModule,
    AuthModule,
    PermissionModule,
    RoleModule,
    SchoolModule, // কমেন্ট সরিয়ে সক্রিয় করা
    StudentModule, // কমেন্ট সরিয়ে সক্রিয় করা
    TeacherModule, // কমেন্ট সরিয়ে সক্রিয় করা
    ParentModule, // কমেন্ট সরিয়ে সক্রিয় করা
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionFilter,
    },
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
    {
      provide: APP_GUARD, // গ্লোবাল AuthGuard সক্রিয় করা
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD, // গ্লোবাল PermissionGuard যুক্ত করা
      useClass: PermissionGuard,
    },
    RedisService, // RedisService যুক্ত করা
    PermissionService,
  ],
  exports: [ClientsModule], // ClientsModule এক্সপোর্ট করা
})
export class AppModule {}
