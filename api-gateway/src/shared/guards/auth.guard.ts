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
  email: string;
  deviceId: string;
  ipAddress: string;
  roleId: string;
  roleName: string;
  schoolId: string;
  permissions: string[];
}

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
        email: decoded.email,
        deviceId: decoded.deviceId,
        ipAddress: decoded.ipAddress,
        roleId: decoded.roleId,
        roleName: decoded.roleName,
        schoolId: decoded.schoolId,
        permissions: decoded.permissions,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
