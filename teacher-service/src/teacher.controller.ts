import { Controller } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { CreateTeacherData, TeacherResponse } from './types/teacherTypes';

@Controller()
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @GrpcMethod('TeacherService', 'createTeacher')
  async createTeacher(data: CreateTeacherData): Promise<TeacherResponse> {
    try {
      return await this.teacherService.createTeacher(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create teacher',
      });
    }
  }

  @GrpcMethod('TeacherService', 'getAllTeachers')
  async getAllTeachers(data: {
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ teachers: TeacherResponse[]; total: number }> {
    try {
      return await this.teacherService.getAllTeachers(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch teachers',
      });
    }
  }

  @GrpcMethod('TeacherService', 'getTeacher')
  async getTeacher(data: { id: string }): Promise<TeacherResponse> {
    try {
      return await this.teacherService.getTeacher(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch teacher',
      });
    }
  }

  @GrpcMethod('TeacherService', 'updateTeacher')
  async updateTeacher(
    data: { id: string } & Partial<CreateTeacherData>,
  ): Promise<TeacherResponse> {
    try {
      return await this.teacherService.updateTeacher(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update teacher',
      });
    }
  }

  @GrpcMethod('TeacherService', 'deleteTeacher')
  async deleteTeacher(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.teacherService.deleteTeacher(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete teacher',
      });
    }
  }

  @GrpcMethod('TeacherService', 'createManyTeachers')
  async createManyTeachers(data: {
    teachers: CreateTeacherData[];
  }): Promise<{ teachers: TeacherResponse[] }> {
    try {
      return await this.teacherService.createManyTeachers(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple teachers',
      });
    }
  }

  @GrpcMethod('TeacherService', 'deleteManyTeachers')
  async deleteManyTeachers(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.teacherService.deleteManyTeachers(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple teachers',
      });
    }
  }
}
