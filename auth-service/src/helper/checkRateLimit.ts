import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { AuthDocument } from 'src/schema/auth.schema';

export const checkRateLimit = async (
  user: AuthDocument,
  type: 'verification' | 'reset',
) => {
  const now = new Date();
  const prefix = type === 'verification' ? 'verification' : 'reset';
  const blockedUntil = user[`${prefix}BlockedUntil`];
  const requestedAt = user[`${prefix}RequestedAt`];
  const requestCount = user[`${prefix}RequestCount`];

  if (blockedUntil && now < blockedUntil) {
    throw new RpcException({
      code: grpc.status.RESOURCE_EXHAUSTED,
      message: `Too many ${type} requests. Try again after ${blockedUntil}`,
    });
  }

  if (requestedAt && now.getTime() - requestedAt.getTime() < 2 * 60 * 1000) {
    throw new RpcException({
      code: grpc.status.RESOURCE_EXHAUSTED,
      message: `${type} already requested. Please wait.`,
    });
  }

  if ((requestCount ?? 0) >= 5) {
    user[`${prefix}BlockedUntil`] = new Date(now.getTime() + 30 * 60 * 1000);
    user[`${prefix}RequestCount`] = 0;
    await user.save();
    throw new RpcException({
      code: grpc.status.RESOURCE_EXHAUSTED,
      message: `Too many ${type} requests. Try again later.`,
    });
  }
};
