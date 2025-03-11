import { Module, ValidationPipe } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    // ClientsModule.register([
    //   {
    //     name: 'USER_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'user',
    //       protoPath: join(__dirname, '../../proto/user.proto'),
    //       url: 'localhost:50051',
    //     },
    //   },
    //   {
    //     name: 'AUTH_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'auth',
    //       protoPath: join(__dirname, '../../proto/auth.proto'),
    //       url: 'localhost:50052',
    //     },
    //   },
    //   {
    //     name: 'PERMISSION_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'permission',
    //       protoPath: join(__dirname, '../../proto/permission.proto'),
    //       url: 'localhost:50052',
    //     },
    //   },
    //   {
    //     name: 'ROLE_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'role',
    //       protoPath: join(__dirname, '../../proto/role.proto'),
    //       url: 'localhost:50052',
    //     },
    //   },
    //   {
    //     name: 'SCHOOL_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'school',
    //       protoPath: join(__dirname, '../../proto/school.proto'),
    //       url: 'localhost:50055',
    //     },
    //   },
    //   {
    //     name: 'STUDENT_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'student',
    //       protoPath: join(__dirname, '../../proto/student.proto'),
    //       url: 'localhost:50056',
    //     },
    //   },
    //   {
    //     name: 'TEACHER_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'teacher',
    //       protoPath: join(__dirname, '../../proto/teacher.proto'),
    //       url: 'localhost:50057',
    //     },
    //   },
    //   {
    //     name: 'PARENT_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'parent',
    //       protoPath: join(__dirname, '../../proto/parent.proto'),
    //       url: 'localhost:50058',
    //     },
    //   },
    // ]),
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
