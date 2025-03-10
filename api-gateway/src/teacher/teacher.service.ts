import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import {
  Teacher,
  CreateTeacherInput,
  UpdateTeacherInput,
  GetAllTeachersInput,
  GetAllTeachersOutput,
  DeleteTeacherOutput,
  CreateManyTeachersInput,
  CreateManyTeachersOutput,
  DeleteManyTeachersInput,
  DeleteManyTeachersOutput,
} from './entities/teacher.entity';
import { TeacherGrpcService } from './types/teacherTypes';

@Injectable()
export class TeacherService {
  private teacherGrpcService: TeacherGrpcService;

  constructor(@Inject('TEACHER_PACKAGE') private client: ClientGrpc) {
    this.teacherGrpcService =
      this.client.getService<TeacherGrpcService>('TeacherService');
  }

  // Helper method to map CreateTeacherInput to CreateTeacherRequest
  private mapToGrpcCreateTeacherRequest(data: CreateTeacherInput) {
    return {
      schoolId: data.schoolId,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      subject: data.subject,
      qualifications: data.qualifications,
      hireDate: data.hireDate,
      profilePictureUrl: data.profilePictureUrl,
      status: data.status,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      nationality: data.nationality,
      socialMediaLinks: data.socialMediaLinks || {}, // This will still work as the structure is the same
      emergencyContact: data.emergencyContact || '',
      salary: data.salary,
      teachingExperienceYears: data.teachingExperienceYears,
      assignedClasses: data.assignedClasses,
      assignedSubjects: data.assignedSubjects,
      studentCount: data.studentCount,
    };
  }

  // Helper method to map UpdateTeacherInput to UpdateTeacherRequest
  private mapToGrpcUpdateTeacherRequest(data: UpdateTeacherInput) {
    return {
      id: data.id,
      schoolId: data.schoolId,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      subject: data.subject,
      qualifications: data.qualifications,
      hireDate: data.hireDate,
      profilePictureUrl: data.profilePictureUrl,
      status: data.status,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      nationality: data.nationality,
      socialMediaLinks: data.socialMediaLinks || {}, // This will still work as the structure is the same
      emergencyContact: data.emergencyContact || '',
      salary: data.salary,
      teachingExperienceYears: data.teachingExperienceYears,
      assignedClasses: data.assignedClasses,
      assignedSubjects: data.assignedSubjects,
      studentCount: data.studentCount,
    };
  }

  // Helper method to map gRPC response to GraphQL Teacher entity
  private mapGrpcToTeacherEntity(response: any): Teacher {
    return {
      _id: response.id,
      schoolId: response.schoolId,
      email: response.email,
      phoneNumber: response.phoneNumber,
      address: response.address,
      subject: response.subject,
      qualifications: response.qualifications || [],
      hireDate: response.hireDate,
      profilePictureUrl: response.profilePictureUrl,
      status: response.status,
      dateOfBirth: response.dateOfBirth,
      gender: response.gender,
      nationality: response.nationality,
      socialMediaLinks: response.socialMediaLinks || {}, // This will still work as the structure is the same
      emergencyContact: response.emergencyContact,
      salary: response.salary,
      teachingExperienceYears: response.teachingExperienceYears,
      assignedClasses: response.assignedClasses || [],
      assignedSubjects: response.assignedSubjects || [],
      studentCount: response.studentCount,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }

  // Rest of the methods remain the same
  async createTeacher(data: CreateTeacherInput): Promise<Teacher> {
    try {
      const grpcRequest = this.mapToGrpcCreateTeacherRequest(data);
      const response = await lastValueFrom(
        this.teacherGrpcService.CreateTeacher(grpcRequest),
      );
      return this.mapGrpcToTeacherEntity(response);
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to create teacher',
      });
    }
  }

  async getAllTeachers(
    data: GetAllTeachersInput,
  ): Promise<GetAllTeachersOutput> {
    try {
      const response = await lastValueFrom(
        this.teacherGrpcService.GetAllTeachers(data),
      );
      return {
        teachers: response.teachers.map((teacher) =>
          this.mapGrpcToTeacherEntity(teacher),
        ),
        total: response.total,
      };
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to fetch teachers',
      });
    }
  }

  async getTeacher(id: string): Promise<Teacher> {
    try {
      const response = await lastValueFrom(
        this.teacherGrpcService.GetTeacher({ id }),
      );
      return this.mapGrpcToTeacherEntity(response);
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to fetch teacher',
      });
    }
  }

  async updateTeacher(data: UpdateTeacherInput): Promise<Teacher> {
    try {
      const grpcRequest = this.mapToGrpcUpdateTeacherRequest(data);
      const response = await lastValueFrom(
        this.teacherGrpcService.UpdateTeacher(grpcRequest),
      );
      return this.mapGrpcToTeacherEntity(response);
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to update teacher',
      });
    }
  }

  async deleteTeacher(id: string): Promise<DeleteTeacherOutput> {
    try {
      const response = await lastValueFrom(
        this.teacherGrpcService.DeleteTeacher({ id }),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to delete teacher',
      });
    }
  }

  async createManyTeachers(
    data: CreateManyTeachersInput,
  ): Promise<CreateManyTeachersOutput> {
    try {
      const grpcRequest = {
        teachers: data.teachers.map((teacher) =>
          this.mapToGrpcCreateTeacherRequest(teacher),
        ),
      };
      const response = await lastValueFrom(
        this.teacherGrpcService.CreateManyTeachers(grpcRequest),
      );
      return {
        teachers: response.teachers.map((teacher) =>
          this.mapGrpcToTeacherEntity(teacher),
        ),
      };
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to create multiple teachers',
      });
    }
  }

  async deleteManyTeachers(
    data: DeleteManyTeachersInput,
  ): Promise<DeleteManyTeachersOutput> {
    try {
      const response = await lastValueFrom(
        this.teacherGrpcService.DeleteManyTeachers(data),
      );
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      throw new RpcException({
        code: error.code || grpc.status.INTERNAL,
        message: error.details || 'Failed to delete multiple teachers',
      });
    }
  }
}
