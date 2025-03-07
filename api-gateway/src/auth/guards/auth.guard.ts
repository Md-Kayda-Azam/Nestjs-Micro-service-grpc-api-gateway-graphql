import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'Q7k9P2mX4vR8tW5wY3nF6jH0eD9cA9bB',
      ) as {
        sub: string;
        email: string;
        role: string;
      };
      request.user = decoded; // ইউজার ডাটা রিকোয়েস্টে সেট করা
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
