import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { CreateSchoolData, SchoolResponse } from './types/schoolTypes.';
import { SchoolService } from './school.service';

@Controller()
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @GrpcMethod('SchoolService', 'createSchool')
  async createSchool(data: CreateSchoolData): Promise<SchoolResponse> {
    try {
      return await this.schoolService.createSchool(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create school',
      });
    }
  }

  @GrpcMethod('SchoolService', 'getAllSchools')
  async getAllSchools(data: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ schools: SchoolResponse[]; total: number }> {
    try {
      return await this.schoolService.getAllSchools(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch schools',
      });
    }
  }

  @GrpcMethod('SchoolService', 'getSchool')
  async getSchool(data: { id: string }): Promise<SchoolResponse> {
    try {
      return await this.schoolService.getSchool(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch school',
      });
    }
  }

  @GrpcMethod('SchoolService', 'updateSchool')
  async updateSchool(
    data: { id: string } & Partial<CreateSchoolData>,
  ): Promise<SchoolResponse> {
    try {
      return await this.schoolService.updateSchool(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update school',
      });
    }
  }

  @GrpcMethod('SchoolService', 'deleteSchool')
  async deleteSchool(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.schoolService.deleteSchool(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete school',
      });
    }
  }

  @GrpcMethod('SchoolService', 'createManySchools')
  async createManySchools(data: {
    schools: CreateSchoolData[];
  }): Promise<{ schools: SchoolResponse[] }> {
    try {
      return await this.schoolService.createManySchools(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple schools',
      });
    }
  }

  @GrpcMethod('SchoolService', 'deleteManySchools')
  async deleteManySchools(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.schoolService.deleteManySchools(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple schools',
      });
    }
  }
}
