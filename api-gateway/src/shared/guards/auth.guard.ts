import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  sub: string;
  deviceId: string;
  roleId: string;
  schoolId: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    // রুটগুলোর নাম চেক করা
    const gqlInfo = ctx.getInfo();
    const fieldName = gqlInfo.fieldName;

    // এই রুটগুলোর জন্য টোকেন চেক করবে না
    const bypassRoutes = ['login', 'verifyAccount', 'resendVerification'];
    if (bypassRoutes.includes(fieldName)) {
      return true; // টোকেন ছাড়াই অ্যালাউ করা হবে
    }

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET is not defined in .env'); // নিশ্চিত করার জন্য
      }
      const decoded = jwt.verify(token, secret, {
        algorithms: ['HS256'],
      }) as JwtPayload;

      // ইউজারের রোল এবং পারমিশন সংরক্ষণ করুন
      request.user = {
        userId: decoded.sub,
        deviceId: decoded.deviceId,
        roleId: decoded.roleId,
        schoolId: decoded.schoolId,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
