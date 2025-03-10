import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RoleGrpcService } from './types/roleTypes';
// import { PermissionService } from '../permission/permission.service'; // PermissionService import করো
import {
  Role,
  CreateRoleInput,
  UpdateRoleInput,
  GetAllRolesInput,
  GetAllRolesOutput,
  DeleteRoleOutput,
  CreateManyRolesInput,
  CreateManyRolesOutput,
  DeleteManyRolesInput,
  DeleteManyRolesOutput,
} from './entities/role.entity';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class RoleService {
  private roleGrpcService: RoleGrpcService;

  constructor(
    @Inject('ROLE_PACKAGE') private client: ClientGrpc,
    private permissionService: PermissionService, // PermissionService ইনজেক্ট করো
  ) {
    this.roleGrpcService =
      this.client.getService<RoleGrpcService>('RoleService');
  }

  //  Permission IDs থেকে পারমিশনের পুরো তথ্য fetch করার ফাংশন

  private async populatePermissions(
    permissionIds: string[],
  ): Promise<Role['permissions']> {
    if (!permissionIds || permissionIds.length === 0) return [];

    const { permissions } =
      await this.permissionService.getManyPermissions(permissionIds);

    // পাওয়া পারমিশনগুলোর ম্যাপ তৈরি করো
    const permissionMap = new Map(permissions.map((p) => [p._id, p]));

    // প্রতিটি permissionId চেক করো
    return permissionIds.map((id) => {
      const permission = permissionMap.get(id);
      if (permission) {
        return permission; // পাওয়া গেলে পারমিশন রিটার্ন
      } else {
        return {
          _id: id,
          name: 'Not found',
          description: 'This permission ID does not exist in the database',
          isActive: false,
        }; // না পাওয়া গেলে কাস্টম অবজেক্ট
      }
    });
  }

  // Permission IDs থেকে পারমিশনের পুরো তথ্য fetch করার ফাংশন
  // private async populatePermissions(
  //   permissionIds: string[],
  // ): Promise<Permission[]> {
  //   const permissions: Permission[] = []; // স্পষ্টভাবে Permission[] টাইপ দাও
  //   for (const id of permissionIds) {
  //     const permission = await this.permissionService.getPermission(id); // PermissionService থেকে তথ্য আনো
  //     permissions.push(permission);
  //   }
  //   return permissions;
  // }

  async createRole(data: CreateRoleInput): Promise<Role> {
    try {
      const response = await lastValueFrom(
        this.roleGrpcService.CreateRole(data),
      );
      const permissions = await this.populatePermissions(
        response.permissionIds,
      );
      return {
        _id: response.id,
        name: response.name,
        description: response.description,
        isActive: response.isActive,
        permissions, // permissionIds এর পরিবর্তে permissions
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create role');
    }
  }

  async getAllRoles(data: GetAllRolesInput): Promise<GetAllRolesOutput> {
    try {
      const response = await lastValueFrom(
        this.roleGrpcService.GetAllRoles(data),
      );

      // response বা response.roles না থাকলে খালি অ্যারে ব্যবহার করো
      const rolesData = Array.isArray(response?.roles) ? response.roles : [];
      const total = response?.total ?? 0;

      const roles = await Promise.all(
        response.roles.map(async (role) => {
          const permissions = await this.populatePermissions(
            role.permissionIds,
          );
          return {
            _id: role.id,
            name: role.name,
            description: role.description,
            isActive: role.isActive,
            permissions, // permissionIds এর পরিবর্তে permissions
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
          };
        }),
      );

      return { roles, total };
    } catch (error) {
      const errorMessage =
        error.details || error.message || 'Failed to fetch roles';
      console.error('Error in getAllRoles:', errorMessage);
      return { roles: [], total: 0 }; // এরর হলেও roles: [] রিটার্ন
    }
  }

  async getRole(id: string): Promise<Role> {
    try {
      const response = await lastValueFrom(
        this.roleGrpcService.GetRole({ id }),
      );
      // console.log(response.permissionIds);
      const permissions = await this.populatePermissions(
        response.permissionIds,
      );
      // console.log(
      //   permissions.map((p) => p.name),
      //   'getPermission',
      // );

      return {
        _id: response.id,
        name: response.name,
        description: response.description,
        isActive: response.isActive,
        permissions, // permissionIds এর পরিবর্তে permissions
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch role');
    }
  }

  async updateRole(data: UpdateRoleInput): Promise<Role> {
    try {
      const response = await lastValueFrom(
        this.roleGrpcService.UpdateRole(data),
      );
      const permissions = await this.populatePermissions(
        response.permissionIds,
      );
      return {
        _id: response.id,
        name: response.name,
        description: response.description,
        isActive: response.isActive,
        permissions, // permissionIds এর পরিবর্তে permissions
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to update role');
    }
  }

  // বাকি ফাংশনগুলো (deleteRole, createManyRoles, deleteManyRoles) একই থাকবে
  async deleteRole(id: string): Promise<DeleteRoleOutput> {
    try {
      const response = await lastValueFrom(
        this.roleGrpcService.DeleteRole({ id }),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to delete role');
    }
  }

  async createManyRoles(
    data: CreateManyRolesInput,
  ): Promise<CreateManyRolesOutput> {
    try {
      const response = await lastValueFrom(
        this.roleGrpcService.CreateManyRoles(data),
      );

      console.log(response.roles, 'createManyRoles');

      const roles = await Promise.all(
        response.roles.map(async (role) => {
          const permissions = await this.populatePermissions(
            role.permissionIds,
          );
          return {
            _id: role.id,
            name: role.name,
            description: role.description,
            isActive: role.isActive,
            permissions,
            createdAt: role.createdAt,
            updatedAt: role.updatedAt,
          };
        }),
      );
      return { roles };
    } catch (error) {
      throw new Error(error.details || 'Failed to create multiple roles');
    }
  }

  async deleteManyRoles(
    data: DeleteManyRolesInput,
  ): Promise<DeleteManyRolesOutput> {
    try {
      const response = await lastValueFrom(
        this.roleGrpcService.DeleteManyRoles(data),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to delete multiple roles');
    }
  }
}
