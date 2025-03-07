import { Module, ValidationPipe } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLError } from 'graphql';
import { ValidationError } from 'class-validator';
import { UserModule } from './user/user.module';
import { GraphQLExceptionFilter } from './graphql-exception.filter';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './shared/guards/auth.guard';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
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
    ]),
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: 'APP_FILTER',
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
      provide: 'APP_GUARD', // গ্লোবাল গার্ড
      useClass: AuthGuard,
    },
  ],
  exports: [ClientsModule], // Export ClientsModule to make USER_PACKAGE available
})
export class AppModule {}
