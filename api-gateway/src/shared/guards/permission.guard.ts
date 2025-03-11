import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { RoleGrpcService } from 'src/role/types/roleTypes';
import { PermissionService } from 'src/permission/permission.service';
import { RedisService } from './redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  private roleGrpcService: RoleGrpcService;

  constructor(
    private reflector: Reflector,
    @Inject('ROLE_PACKAGE') private client: ClientGrpc,
    private redisService: RedisService,
    private permissionService: PermissionService,
  ) {
    this.roleGrpcService =
      this.client.getService<RoleGrpcService>('RoleService');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // প্রয়োজনীয় পারমিশন ফেচ করা
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // কোনো পারমিশন লাগবে না
    }

    // GQL কনটেক্সট থেকে রিকোয়েস্ট এবং ইউজার ফেচ করা
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const user = request.user;

    if (!user || !user.roleId || !user.userId) {
      throw new ForbiddenException('User or role not found');
    }

    // Redis থেকে পারমিশন ফেচ করা
    let userPermissions = await this.permissionService.getCachedUserPermissions(
      user.userId,
    );

    // যদি Redis-এ পারমিশন না থাকে, তাহলে ডাটাবেস থেকে ফেচ করে ক্যাশ করা
    if (!userPermissions || userPermissions.length === 0) {
      await this.permissionService.cacheUserPermissions(
        user.userId,
        user.roleId,
      );
      userPermissions = await this.permissionService.getCachedUserPermissions(
        user.userId,
      );
    }

    // পারমিশন চেক করা
    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
