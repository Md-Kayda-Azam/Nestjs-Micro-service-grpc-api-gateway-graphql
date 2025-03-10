import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { StudentGrpcService } from './types/studentTypes';
import {
  Student,
  CreateStudentInput,
  UpdateStudentInput,
  GetAllStudentsInput,
  GetAllStudentsOutput,
  DeleteStudentOutput,
  CreateManyStudentsInput,
  CreateManyStudentsOutput,
  DeleteManyStudentsInput,
  DeleteManyStudentsOutput,
} from './entities/student.entity';

@Injectable()
export class StudentService {
  private studentGrpcService: StudentGrpcService;

  constructor(@Inject('STUDENT_PACKAGE') private client: ClientGrpc) {
    this.studentGrpcService =
      this.client.getService<StudentGrpcService>('StudentService');
  }

  // Helper method to map gRPC response to Student entity
  private mapGrpcStudentToEntity(response: any): Student {
    return {
      _id: response.id,
      schoolId: response.schoolId,
      dateOfBirth: response.dateOfBirth,
      gender: response.gender,
      studentID: response.studentID,
      email: response.email,
      phoneNumber: response.phoneNumber,
      address: response.address,
      admissionDate: response.admissionDate,
      enrollmentDate: response.enrollmentDate,
      classId: response.classId,
      enrolledCourses: response.enrolledCourses || [],
      grades: response.grades || [],
      extracurricularActivities: response.extracurricularActivities || [],
      parentId: response.parentId,
      nationality: response.nationality,
      graduationDate: response.graduationDate,
      profilePictureUrl: response.profilePictureUrl,
      awards: response.awards || [],
      healthDetails: response.healthDetails,
      isSpecialNeeds: response.isSpecialNeeds || false,
      remarks: response.remarks,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }

  async createStudent(data: CreateStudentInput): Promise<Student> {
    try {
      const response = await lastValueFrom(
        this.studentGrpcService.CreateStudent(data),
      );
      return this.mapGrpcStudentToEntity(response);
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to create student',
      });
    }
  }

  async getAllStudents(
    data: GetAllStudentsInput,
  ): Promise<GetAllStudentsOutput> {
    try {
      const response = await lastValueFrom(
        this.studentGrpcService.GetAllStudents(data),
      );
      return {
        students: response.students.map((student) =>
          this.mapGrpcStudentToEntity(student),
        ),
        total: response.total,
      };
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to fetch students',
      });
    }
  }

  async getStudent(id: string): Promise<Student> {
    try {
      const response = await lastValueFrom(
        this.studentGrpcService.GetStudent({ id }),
      );
      return this.mapGrpcStudentToEntity(response);
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to fetch student',
      });
    }
  }

  async updateStudent(data: UpdateStudentInput): Promise<Student> {
    try {
      const response = await lastValueFrom(
        this.studentGrpcService.UpdateStudent(data),
      );
      return this.mapGrpcStudentToEntity(response);
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to update student',
      });
    }
  }

  async deleteStudent(id: string): Promise<DeleteStudentOutput> {
    try {
      const response = await lastValueFrom(
        this.studentGrpcService.DeleteStudent({ id }),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to delete student',
      });
    }
  }

  async createManyStudents(
    data: CreateManyStudentsInput,
  ): Promise<CreateManyStudentsOutput> {
    try {
      const response = await lastValueFrom(
        this.studentGrpcService.CreateManyStudents(data),
      );
      return {
        students: response.students.map((student) =>
          this.mapGrpcStudentToEntity(student),
        ),
      };
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to create multiple students',
      });
    }
  }

  async deleteManyStudents(
    data: DeleteManyStudentsInput,
  ): Promise<DeleteManyStudentsOutput> {
    try {
      const response = await lastValueFrom(
        this.studentGrpcService.DeleteManyStudents(data),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to delete multiple students',
      });
    }
  }
}
