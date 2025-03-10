import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { CreateRoleData, RoleResponse } from '../types/roleTypes';
import { RoleService } from './role.service';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @GrpcMethod('RoleService', 'createRole')
  async createRole(data: CreateRoleData): Promise<RoleResponse> {
    try {
      const role = await this.roleService.createRole(data);
      return role;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create role',
      });
    }
  }

  @GrpcMethod('RoleService', 'getAllRoles')
  async getAllRoles(data: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ roles: RoleResponse[]; total: number }> {
    try {
      return await this.roleService.getAllRoles(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch roles',
      });
    }
  }

  @GrpcMethod('RoleService', 'getRole')
  async getRole(data: { id: string }): Promise<RoleResponse> {
    try {
      return await this.roleService.getRole(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch role',
      });
    }
  }

  @GrpcMethod('RoleService', 'updateRole')
  async updateRole(data: {
    id: string;
    name?: string;
    permissionIds?: string[];
    description?: string;
    isActive?: boolean;
  }): Promise<RoleResponse> {
    try {
      return await this.roleService.updateRole(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update role',
      });
    }
  }

  @GrpcMethod('RoleService', 'deleteRole')
  async deleteRole(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.roleService.deleteRole(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete role',
      });
    }
  }

  @GrpcMethod('RoleService', 'createManyRoles')
  async createManyRoles(data: {
    roles: CreateRoleData[];
  }): Promise<{ roles: RoleResponse[] }> {
    try {
      return await this.roleService.createManyRoles(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple roles',
      });
    }
  }

  @GrpcMethod('RoleService', 'deleteManyRoles')
  async deleteManyRoles(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.roleService.deleteManyRoles(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple roles',
      });
    }
  }
}
