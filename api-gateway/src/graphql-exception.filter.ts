import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();

    // GraphQLError হলে শুধু রেসপন্সে ফেরত দিন, কনসোলে লগ করবেন না
    if (exception instanceof GraphQLError) {
      return exception;
    }

    // অন্যান্য এররের জন্য ডিফল্ট GraphQLError তৈরি
    return new GraphQLError(exception.message || 'Internal server error', {
      extensions: {
        code: exception.extensions?.code || 'INTERNAL_SERVER_ERROR',
        originalError: exception,
      },
    });
  }
}
