import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { CreateStudentData, StudentResponse } from './types/studentTypes';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @GrpcMethod('StudentService', 'createStudent')
  async createStudent(data: CreateStudentData): Promise<StudentResponse> {
    try {
      return await this.studentService.createStudent(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create student',
      });
    }
  }

  @GrpcMethod('StudentService', 'getAllStudents')
  async getAllStudents(data: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ students: StudentResponse[]; total: number }> {
    try {
      return await this.studentService.getAllStudents(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch students',
      });
    }
  }

  @GrpcMethod('StudentService', 'getStudent')
  async getStudent(data: { id: string }): Promise<StudentResponse> {
    try {
      return await this.studentService.getStudent(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch student',
      });
    }
  }

  @GrpcMethod('StudentService', 'updateStudent')
  async updateStudent(
    data: { id: string } & Partial<CreateStudentData>,
  ): Promise<StudentResponse> {
    try {
      return await this.studentService.updateStudent(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update student',
      });
    }
  }

  @GrpcMethod('StudentService', 'deleteStudent')
  async deleteStudent(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.studentService.deleteStudent(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete student',
      });
    }
  }

  @GrpcMethod('StudentService', 'createManyStudents')
  async createManyStudents(data: {
    students: CreateStudentData[];
  }): Promise<{ students: StudentResponse[] }> {
    try {
      return await this.studentService.createManyStudents(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple students',
      });
    }
  }

  @GrpcMethod('StudentService', 'deleteManyStudents')
  async deleteManyStudents(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      return await this.studentService.deleteManyStudents(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple students',
      });
    }
  }
}
