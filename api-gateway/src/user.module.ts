import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { GraphQLExceptionFilter } from './graphql-exception.filter';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
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
    ]),
  ],
  providers: [
    UserResolver,
    UserService,
    {
      provide: 'APP_FILTER',
      useClass: GraphQLExceptionFilter,
    },
  ],
})
export class UserModule {}
