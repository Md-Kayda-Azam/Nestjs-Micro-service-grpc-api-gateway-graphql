import { Module, ValidationPipe } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLError } from 'graphql';
import { ValidationError } from 'class-validator';
import { UserModule } from './user/user.module';
import { GraphQLExceptionFilter } from './graphql-exception.filter';

@Module({
  imports: [
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
    ]),
    UserModule,
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
  ],
  exports: [ClientsModule], // Export ClientsModule to make USER_PACKAGE available
})
export class AppModule {}
