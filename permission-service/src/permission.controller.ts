import { Controller } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import {
  CreatePermissionData,
  PermissionResponse,
} from './types/permissionTypes';

@Controller()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @GrpcMethod('PermissionService', 'createPermission')
  async createPermission(
    data: CreatePermissionData,
  ): Promise<PermissionResponse> {
    try {
      const permission = await this.permissionService.createPermission(data);
      return permission;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create permission',
      });
    }
  }

  @GrpcMethod('PermissionService', 'getAllPermissions')
  async getAllPermissions(data: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ permissions: PermissionResponse[]; total: number }> {
    try {
      return await this.permissionService.getAllPermissions(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch permissions',
      });
    }
  }

  @GrpcMethod('PermissionService', 'getPermission')
  async getPermission(data: { id: string }): Promise<PermissionResponse> {
    try {
      return await this.permissionService.getPermission(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch permission',
      });
    }
  }

  @GrpcMethod('PermissionService', 'updatePermission')
  async updatePermission(data: {
    id: string;
    name?: string;
    description?: string;
    isActive?: boolean;
  }): Promise<PermissionResponse> {
    try {
      return await this.permissionService.updatePermission(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update permission',
      });
    }
  }

  @GrpcMethod('PermissionService', 'deletePermission')
  async deletePermission(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.permissionService.deletePermission(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete permission',
      });
    }
  }

  @GrpcMethod('PermissionService', 'createManyPermissions')
  async createManyPermissions(data: {
    permissions: CreatePermissionData[];
  }): Promise<{ permissions: PermissionResponse[] }> {
    try {
      return await this.permissionService.createManyPermissions(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple permissions',
      });
    }
  }

  @GrpcMethod('PermissionService', 'deleteManyPermissions')
  async deleteManyPermissions(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.permissionService.deleteManyPermissions(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple permissions',
      });
    }
  }
}
