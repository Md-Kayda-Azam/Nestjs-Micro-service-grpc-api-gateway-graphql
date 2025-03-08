import { Controller } from '@nestjs/common';
import { ParentService } from './parent.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { CreateParentData, ParentResponse } from './types/parentTypes';

@Controller()
export class ParentController {
  constructor(private readonly parentService: ParentService) {}

  @GrpcMethod('ParentService', 'createParent')
  async createParent(data: CreateParentData): Promise<ParentResponse> {
    try {
      return await this.parentService.createParent(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create parent',
      });
    }
  }

  @GrpcMethod('ParentService', 'getAllParents')
  async getAllParents(data: {
    schoolId?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ parents: ParentResponse[]; total: number }> {
    try {
      return await this.parentService.getAllParents(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch parents',
      });
    }
  }

  @GrpcMethod('ParentService', 'getParent')
  async getParent(data: { id: string }): Promise<ParentResponse> {
    try {
      return await this.parentService.getParent(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch parent',
      });
    }
  }

  @GrpcMethod('ParentService', 'updateParent')
  async updateParent(
    data: { id: string } & Partial<CreateParentData>,
  ): Promise<ParentResponse> {
    try {
      return await this.parentService.updateParent(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update parent',
      });
    }
  }

  @GrpcMethod('ParentService', 'deleteParent')
  async deleteParent(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.parentService.deleteParent(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete parent',
      });
    }
  }

  @GrpcMethod('ParentService', 'createManyParents')
  async createManyParents(data: {
    parents: CreateParentData[];
  }): Promise<{ parents: ParentResponse[] }> {
    try {
      return await this.parentService.createManyParents(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple parents',
      });
    }
  }

  @GrpcMethod('ParentService', 'deleteManyParents')
  async deleteManyParents(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.parentService.deleteManyParents(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple parents',
      });
    }
  }
}
