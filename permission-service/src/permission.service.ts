import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionDocument, Permission } from './schema/permission.schema';
import {
  CreatePermissionData,
  PermissionResponse,
} from './types/permissionTypes';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async createPermission(
    data: CreatePermissionData,
  ): Promise<PermissionResponse> {
    const existingPermission = await this.permissionModel
      .findOne({ name: data.name })
      .exec();
    if (existingPermission) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'A permission with this name already exists',
      });
    }

    const newPermission = new this.permissionModel({
      name: data.name,
      description: data.description || null, // undefined হলে null হবে
    });

    const savedPermission = await newPermission.save();

    return {
      id: savedPermission._id.toString(),
      name: savedPermission.name,
      description: savedPermission.description,
      isActive: savedPermission.isActive,
      createdAt: savedPermission.createdAt.toISOString(),
      updatedAt: savedPermission.updatedAt.toISOString(),
    };
  }

  async getAllPermissions(data: {
    limit?: number;
    offset?: number;
  }): Promise<{ permissions: PermissionResponse[]; total: number }> {
    try {
      const filter: any = {};
      // if (data.isActive !== undefined) filter.isActive = data.isActive;

      // পেজিনেশনের জন্য limit এবং offset সেট করা
      const limit = data.limit ? Math.min(data.limit, 100) : 10; // সর্বোচ্চ 100, ডিফল্ট 10
      const offset = data.offset || 0;

      // টোটাল কাউন্ট পাওয়া
      const total = await this.permissionModel.countDocuments(filter).exec();

      // ডাটা ফেচ করা
      const permissions = await this.permissionModel
        .find(filter)
        .skip(offset)
        .limit(limit)
        .exec();

      // রেসপন্স ফরম্যাট
      const response = {
        permissions: permissions.map((p) => ({
          id: p._id.toString(),
          name: p.name,
          description: p.description,
          isActive: p.isActive,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        })),
        total, // টোটাল রেকর্ড সংখ্যা
      };

      return response;
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch permissions',
      });
    }
  }
  async getManyPermissions(data: {
    ids: string[];
  }): Promise<{ permissions: any[]; total: number }> {
    try {
      const permissions = await this.permissionModel
        .find({ _id: { $in: data.ids } })
        .exec();
      const total = await this.permissionModel
        .countDocuments({ _id: { $in: data.ids } })
        .exec();

      const response = {
        permissions: permissions.map((p) => ({
          id: p._id.toString(),
          name: p.name,
          description: p.description,
          isActive: p.isActive,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        })),
        total,
      };

      return response;
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch permissions',
      });
    }
  }

  async getPermission(data: { id: string }): Promise<PermissionResponse> {
    const permission = await this.permissionModel.findById(data.id).exec();
    if (!permission) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Permission not found',
      });
    }

    return {
      id: permission._id.toString(),
      name: permission.name,
      description: permission.description,
      isActive: permission.isActive,
      createdAt: permission.createdAt.toISOString(),
      updatedAt: permission.updatedAt.toISOString(),
    };
  }

  async updatePermission(data: {
    id: string;
    name?: string;
    description?: string;
    isActive?: boolean;
  }): Promise<PermissionResponse> {
    const updateData: Partial<Permission> = {};
    if (data.name) updateData.name = data.name;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const permission = await this.permissionModel
      .findByIdAndUpdate(data.id, updateData, { new: true })
      .exec();
    if (!permission) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Permission not found',
      });
    }

    return {
      id: permission._id.toString(),
      name: permission.name,
      description: permission.description,
      isActive: permission.isActive,
      createdAt: permission.createdAt.toISOString(),
      updatedAt: permission.updatedAt.toISOString(),
    };
  }

  async deletePermission(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    const result = await this.permissionModel.findByIdAndDelete(data.id).exec();
    if (!result) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Permission not found',
      });
    }

    return {
      success: true,
      message: 'Permission deleted successfully',
    };
  }

  async createManyPermissions(data: {
    permissions: CreatePermissionData[];
  }): Promise<{ permissions: any[] }> {
    const permissionsToCreate = data.permissions.map((p) => ({
      name: p.name,
      description: p.description || null,
    }));

    const savedPermissions =
      await this.permissionModel.insertMany(permissionsToCreate);

    return {
      permissions: savedPermissions.map((p) => ({
        id: p._id.toString(),
        name: p.name,
        isActive: p.isActive,
        description: p.description,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      })),
    };
  }

  async deleteManyPermissions(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    const result = await this.permissionModel
      .deleteMany({ _id: { $in: data.ids } })
      .exec();

    if (result.deletedCount === 0) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'No permissions found to delete',
      });
    }

    return {
      success: true,
      message: `${result.deletedCount} permissions deleted successfully`,
    };
  }
}
