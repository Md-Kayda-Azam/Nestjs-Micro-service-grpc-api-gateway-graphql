import { Controller } from '@nestjs/common';
import { StudentService } from './student.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import {
  CreateStudentData,
  StudentResponse,
  GetAllStudentsRequest,
  GetAllStudentsResponse,
  GetStudentRequest,
  UpdateStudentRequest,
  DeleteStudentRequest,
  DeleteStudentResponse,
  CreateManyStudentsRequest,
  CreateManyStudentsResponse,
  DeleteManyStudentsRequest,
  DeleteManyStudentsResponse,
} from './types/studentTypes';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @GrpcMethod('StudentService', 'CreateStudent')
  async createStudent(data: CreateStudentData): Promise<StudentResponse> {
    try {
      return await this.studentService.createStudent(data);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create student',
      });
    }
  }

  @GrpcMethod('StudentService', 'GetAllStudents')
  async getAllStudents(
    data: GetAllStudentsRequest,
  ): Promise<GetAllStudentsResponse> {
    try {
      return await this.studentService.getAllStudents(data);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch students',
      });
    }
  }

  @GrpcMethod('StudentService', 'GetStudent')
  async getStudent(data: GetStudentRequest): Promise<StudentResponse> {
    try {
      return await this.studentService.getStudent(data);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch student',
      });
    }
  }

  @GrpcMethod('StudentService', 'UpdateStudent')
  async updateStudent(data: UpdateStudentRequest): Promise<StudentResponse> {
    try {
      return await this.studentService.updateStudent(data);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update student',
      });
    }
  }

  @GrpcMethod('StudentService', 'DeleteStudent')
  async deleteStudent(
    data: DeleteStudentRequest,
  ): Promise<DeleteStudentResponse> {
    try {
      return await this.studentService.deleteStudent(data);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete student',
      });
    }
  }

  @GrpcMethod('StudentService', 'CreateManyStudents')
  async createManyStudents(
    data: CreateManyStudentsRequest,
  ): Promise<CreateManyStudentsResponse> {
    try {
      return await this.studentService.createManyStudents(data);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple students',
      });
    }
  }

  @GrpcMethod('StudentService', 'DeleteManyStudents')
  async deleteManyStudents(
    data: DeleteManyStudentsRequest,
  ): Promise<DeleteManyStudentsResponse> {
    try {
      return await this.studentService.deleteManyStudents(data);
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple students',
      });
    }
  }
}
