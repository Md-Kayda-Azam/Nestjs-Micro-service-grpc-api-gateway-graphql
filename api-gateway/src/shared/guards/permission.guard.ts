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
import { RedisService } from './redis.service';
import { lastValueFrom } from 'rxjs';
import { RoleGrpcService } from 'src/role/types/roleTypes';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  private roleGrpcService: RoleGrpcService;

  constructor(
    private reflector: Reflector,
    // @Inject('ROLE_PACKAGE') private client: ClientGrpc,
    // private redisService: RedisService,
    // private permissionService: PermissionService,
  ) {
    // this.roleGrpcService =
    //   this.client.getService<RoleGrpcService>('RoleService');
  }

  // private async populatePermissions(
  //   permissionIds: string[],
  // ): Promise<string[]> {
  //   if (!permissionIds || permissionIds.length === 0) return [];

  //   const { permissions } =
  //     await this.permissionService.getManyPermissions(permissionIds);
  //   return permissions.map((p) => p.name);
  // }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const user = request.user;

    if (!user || !user.roleId) {
      throw new ForbiddenException('User role not found');
    }

    // const roleResponse = await lastValueFrom(
    //   this.roleGrpcService.GetRole({ id: user.roleId }),
    // );

    // const permissions = await this.populatePermissions(
    //   roleResponse.permissionIds,
    // );

    const permissionss = ['users:create'];
    const hasPermission = requiredPermissions.every(
      (permission) => permissionss.includes(permission),

      // user.permissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
