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

    // লগইন রুট বাইপাস করা
    const gqlInfo = ctx.getInfo();
    const fieldName = gqlInfo.fieldName;
    if (fieldName === 'login') {
      return true; // লগইন রুটে টোকেন চেক করবে না
    }

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '', {
        algorithms: ['HS256'],
      }) as {
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
