import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDocument, Role } from './schema/role.schema';
import { CreateRoleData, RoleResponse } from './types/roleTypes';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
  ) {}

  async createRole(data: CreateRoleData): Promise<RoleResponse> {
    const existingRole = await this.roleModel
      .findOne({ name: data.name })
      .exec();
    if (existingRole) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'A role with this name already exists',
      });
    }

    const newRole = new this.roleModel({
      name: data.name,
      permissionIds: data.permissionIds || [],
      description: data.description || null,
      isActive: data.isActive !== undefined ? data.isActive : true,
    });

    const savedRole = await newRole.save();

    return {
      id: savedRole._id.toString(),
      name: savedRole.name,
      permissionIds: savedRole.permissionIds,
      description: savedRole.description,
      isActive: savedRole.isActive,
      createdAt: savedRole.createdAt.toISOString(),
      updatedAt: savedRole.updatedAt.toISOString(),
    };
  }

  async getAllRoles(data: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ roles: RoleResponse[]; total: number }> {
    try {
      const filter: any = {};
      if (data.isActive !== undefined) filter.isActive = data.isActive;

      // পেজিনেশনের জন্য limit এবং offset সেট করা
      const limit = data.limit ? Math.min(data.limit, 100) : 10; // সর্বোচ্চ 100, ডিফল্ট 10
      const offset = data.offset || 0;

      // টোটাল কাউন্ট পাওয়া
      const total = await this.roleModel.countDocuments(filter).exec();

      // ডাটা ফেচ করা
      const roles = await this.roleModel
        .find(filter)
        .skip(offset)
        .limit(limit)
        .exec();

      // রেসপন্স ফরম্যাট
      const response = {
        roles: roles.map((r) => ({
          id: r._id.toString(),
          name: r.name,
          permissionIds: r.permissionIds,
          description: r.description,
          isActive: r.isActive,
          createdAt: r.createdAt.toISOString(),
          updatedAt: r.updatedAt.toISOString(),
        })),
        total, // টোটাল রেকর্ড সংখ্যা
      };

      return response;
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch roles',
      });
    }
  }

  async getRole(data: { id: string }): Promise<RoleResponse> {
    const role = await this.roleModel.findById(data.id).exec();
    if (!role) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Role not found',
      });
    }

    return {
      id: role._id.toString(),
      name: role.name,
      permissionIds: role.permissionIds,
      description: role.description,
      isActive: role.isActive,
      createdAt: role.createdAt.toISOString(),
      updatedAt: role.updatedAt.toISOString(),
    };
  }

  async updateRole(data: {
    id: string;
    name?: string;
    permissionIds?: string[];
    description?: string;
    isActive?: boolean;
  }): Promise<RoleResponse> {
    const updateData: Partial<Role> = {};
    if (data.name) updateData.name = data.name;
    if (data.permissionIds) updateData.permissionIds = data.permissionIds;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const role = await this.roleModel
      .findByIdAndUpdate(data.id, updateData, { new: true })
      .exec();
    if (!role) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Role not found',
      });
    }

    return {
      id: role._id.toString(),
      name: role.name,
      permissionIds: role.permissionIds,
      description: role.description,
      isActive: role.isActive,
      createdAt: role.createdAt.toISOString(),
      updatedAt: role.updatedAt.toISOString(),
    };
  }

  async deleteRole(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    const result = await this.roleModel.findByIdAndDelete(data.id).exec();
    if (!result) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Role not found',
      });
    }

    return {
      success: true,
      message: 'Role deleted successfully',
    };
  }

  async createManyRoles(data: {
    roles: CreateRoleData[];
  }): Promise<{ roles: any[] }> {
    const rolesToCreate = data.roles.map((r) => ({
      name: r.name,
      permissionIds: r.permissionIds || [],
      description: r.description || null,
      isActive: r.isActive !== undefined ? r.isActive : true,
    }));

    const savedRoles = await this.roleModel.insertMany(rolesToCreate);

    return {
      roles: savedRoles.map((r) => ({
        id: r._id.toString(),
        name: r.name,
        permissionIds: r.permissionIds,
        description: r.description,
        isActive: r.isActive,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      })),
    };
  }

  async deleteManyRoles(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    const result = await this.roleModel
      .deleteMany({ _id: { $in: data.ids } })
      .exec();

    if (result.deletedCount === 0) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'No roles found to delete',
      });
    }

    return {
      success: true,
      message: `${result.deletedCount} roles deleted successfully`,
    };
  }
}
