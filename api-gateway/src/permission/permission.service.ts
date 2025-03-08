import { Inject, Injectable } from '@nestjs/common';
import { PermissionGrpcService } from './types/permissionTypes';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreatePermissionInput,
  Permission,
} from './entities/permission.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PermissionService {
  private permissionGrpcService: PermissionGrpcService;

  constructor(@Inject('PERMISSION_PACKAGE') private client: ClientGrpc) {
    this.permissionGrpcService =
      this.client.getService<PermissionGrpcService>('PermissionService');
  }
  /**
   * Create Permission
   * @param data
   * @returns
   */
  async createPermission(data: CreatePermissionInput): Promise<Permission> {
    try {
      const response = await lastValueFrom(
        this.permissionGrpcService.CreateUser(data),
      );

      return {
        _id: response.id, // Map id to _id
        name: response.name,
        description: response.description,
        isActive: response.isActive,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create user');
    }
  }
}
