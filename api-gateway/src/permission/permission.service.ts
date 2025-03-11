import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PermissionGrpcService } from './types/permissionTypes';
import {
  Permission,
  CreatePermissionInput,
  UpdatePermissionInput,
  GetAllPermissionsInput,
  GetAllPermissionsOutput,
  DeletePermissionOutput,
  CreateManyPermissionsInput,
  CreateManyPermissionsOutput,
  DeleteManyPermissionsInput,
  DeleteManyPermissionsOutput,
} from './entities/permission.entity';
import { RoleGrpcService } from 'src/role/types/roleTypes';
import { RedisService } from 'src/shared/guards/redis.service';

@Injectable()
export class PermissionService {
  private permissionGrpcService: PermissionGrpcService;
  private roleGrpcService: RoleGrpcService; // এখানে RoleGrpcService যুক্ত করা হয়েছে

  constructor(
    @Inject('PERMISSION_PACKAGE') private permissionClient: ClientGrpc,
    @Inject('ROLE_PACKAGE') private roleClient: ClientGrpc, // নতুন RoleClient যোগ করা হলো
    private redisService: RedisService,
  ) {}

  onModuleInit() {
    this.permissionGrpcService =
      this.permissionClient.getService<PermissionGrpcService>(
        'PermissionService',
      );
    this.roleGrpcService =
      this.roleClient.getService<RoleGrpcService>('RoleService'); // RoleService ইনিশিয়ালাইজ করা হলো
  }

  async cacheUserPermissions(userId: string, roleId: string): Promise<void> {
    try {
      // `this.roleGrpcService` ব্যবহার করুন
      const roleResponse = await lastValueFrom(
        this.roleGrpcService.GetRole({ id: roleId }),
      );
      console.log(roleResponse);

      const permissionIds = roleResponse.permissionIds || [];
      if (permissionIds.length === 0) {
        await this.redisService.setJson(`user:permissions:${userId}`, []);
        return;
      }

      const { permissions } = await this.getManyPermissions(permissionIds);
      const permissionNames = permissions.map((perm) => perm.name);

      await this.redisService.setJson(
        `user:permissions:${userId}`,
        permissionNames,
        3600,
      );
    } catch (error) {
      console.error('Error caching permissions:', error);
      throw new Error('Failed to cache permissions');
    }
  }

  async getCachedUserPermissions(userId: string): Promise<string[]> {
    const permissions = await this.redisService.getJson<string[]>(
      `user:permissions:${userId}`,
    );
    return permissions || [];
  }

  async createPermission(data: CreatePermissionInput): Promise<Permission> {
    try {
      const response = await lastValueFrom(
        this.permissionGrpcService.CreatePermission(data),
      );
      return {
        _id: response.id,
        name: response.name,
        description: response.description,
        isActive: response.isActive,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error.details || 'Failed to create permission');
    }
  }

  async getAllPermissions(
    data: GetAllPermissionsInput,
  ): Promise<GetAllPermissionsOutput> {
    try {
      const response = await lastValueFrom(
        this.permissionGrpcService.GetAllPermissions(data),
      );
      return {
        permissions: response.permissions.map((perm) => ({
          _id: perm.id,
          name: perm.name,
          description: perm.description,
          isActive: perm.isActive,
          createdAt: perm.createdAt,
          updatedAt: perm.updatedAt,
        })),
        total: response.total,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch permissions');
    }
  }

  async getPermission(id: string): Promise<Permission> {
    try {
      const response = await lastValueFrom(
        this.permissionGrpcService.GetPermission({ id }),
      );
      return {
        _id: response.id,
        name: response.name,
        description: response.description,
        isActive: response.isActive,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch permission');
    }
  }

  async updatePermission(data: UpdatePermissionInput): Promise<Permission> {
    try {
      const response = await lastValueFrom(
        this.permissionGrpcService.UpdatePermission(data),
      );
      return {
        _id: response.id,
        name: response.name,
        description: response.description,
        isActive: response.isActive,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to update permission');
    }
  }

  async deletePermission(id: string): Promise<DeletePermissionOutput> {
    try {
      const response = await lastValueFrom(
        this.permissionGrpcService.DeletePermission({ id }),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to delete permission');
    }
  }

  async createManyPermissions(
    data: CreateManyPermissionsInput,
  ): Promise<CreateManyPermissionsOutput> {
    try {
      const response = await lastValueFrom(
        this.permissionGrpcService.CreateManyPermissions(data),
      );
      return {
        permissions: response.permissions.map((perm) => ({
          _id: perm.id,
          name: perm.name,
          description: perm.description,
          isActive: perm.isActive,
          createdAt: perm.createdAt,
          updatedAt: perm.updatedAt,
        })),
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create multiple permissions');
    }
  }

  async deleteManyPermissions(
    data: DeleteManyPermissionsInput,
  ): Promise<DeleteManyPermissionsOutput> {
    try {
      const response = await lastValueFrom(
        this.permissionGrpcService.DeleteManyPermissions(data),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to delete multiple permissions');
    }
  }
  async getManyPermissions(
    ids: string[],
  ): Promise<{ permissions: Permission[]; total: number }> {
    try {
      const response = await lastValueFrom(
        this.permissionGrpcService.GetManyPermissions({ ids }),
      );
      const permissions = response.permissions.map((permission) => ({
        _id: permission.id,
        name: permission.name,
        description: permission.description,
        isActive: permission.isActive,
        createdAt: permission.createdAt,
        updatedAt: permission.updatedAt,
      }));
      return {
        permissions,
        total: response.total, // total ফিল্ড যোগ করো
      };
    } catch (error) {
      return { permissions: [], total: 0 };
    }
  }
}
