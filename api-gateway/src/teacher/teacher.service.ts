import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
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

  async createTeacher(data: CreateTeacherInput): Promise<Teacher> {
    try {
      const response = await lastValueFrom(
        this.teacherGrpcService.CreateTeacher(data),
      );
      return {
        _id: response.id,
        schoolId: response.schoolId,
        email: response.email,
        phoneNumber: response.phoneNumber,
        address: response.address,
        subject: response.subject,
        qualifications: response.qualifications,
        hireDate: response.hireDate,
        profilePictureUrl: response.profilePictureUrl,
        status: response.status,
        dateOfBirth: response.dateOfBirth,
        gender: response.gender,
        nationality: response.nationality,
        socialMediaLinks: response.socialMediaLinks,
        emergencyContact: response.emergencyContact,
        salary: response.salary,
        teachingExperienceYears: response.teachingExperienceYears,
        assignedClasses: response.assignedClasses,
        assignedSubjects: response.assignedSubjects,
        studentCount: response.studentCount,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create teacher');
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
        teachers: response.teachers.map((teacher) => ({
          _id: teacher.id,
          schoolId: teacher.schoolId,
          email: teacher.email,
          phoneNumber: teacher.phoneNumber,
          address: teacher.address,
          subject: teacher.subject,
          qualifications: teacher.qualifications,
          hireDate: teacher.hireDate,
          profilePictureUrl: teacher.profilePictureUrl,
          status: teacher.status,
          dateOfBirth: teacher.dateOfBirth,
          gender: teacher.gender,
          nationality: teacher.nationality,
          socialMediaLinks: teacher.socialMediaLinks,
          emergencyContact: teacher.emergencyContact,
          salary: teacher.salary,
          teachingExperienceYears: teacher.teachingExperienceYears,
          assignedClasses: teacher.assignedClasses,
          assignedSubjects: teacher.assignedSubjects,
          studentCount: teacher.studentCount,
          createdAt: teacher.createdAt,
          updatedAt: teacher.updatedAt,
        })),
        total: response.total,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch teachers');
    }
  }

  async getTeacher(id: string): Promise<Teacher> {
    try {
      const response = await lastValueFrom(
        this.teacherGrpcService.GetTeacher({ id }),
      );
      return {
        _id: response.id,
        schoolId: response.schoolId,
        email: response.email,
        phoneNumber: response.phoneNumber,
        address: response.address,
        subject: response.subject,
        qualifications: response.qualifications,
        hireDate: response.hireDate,
        profilePictureUrl: response.profilePictureUrl,
        status: response.status,
        dateOfBirth: response.dateOfBirth,
        gender: response.gender,
        nationality: response.nationality,
        socialMediaLinks: response.socialMediaLinks,
        emergencyContact: response.emergencyContact,
        salary: response.salary,
        teachingExperienceYears: response.teachingExperienceYears,
        assignedClasses: response.assignedClasses,
        assignedSubjects: response.assignedSubjects,
        studentCount: response.studentCount,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch teacher');
    }
  }

  async updateTeacher(data: UpdateTeacherInput): Promise<Teacher> {
    try {
      const response = await lastValueFrom(
        this.teacherGrpcService.UpdateTeacher(data),
      );
      return {
        _id: response.id,
        schoolId: response.schoolId,
        email: response.email,
        phoneNumber: response.phoneNumber,
        address: response.address,
        subject: response.subject,
        qualifications: response.qualifications,
        hireDate: response.hireDate,
        profilePictureUrl: response.profilePictureUrl,
        status: response.status,
        dateOfBirth: response.dateOfBirth,
        gender: response.gender,
        nationality: response.nationality,
        socialMediaLinks: response.socialMediaLinks,
        emergencyContact: response.emergencyContact,
        salary: response.salary,
        teachingExperienceYears: response.teachingExperienceYears,
        assignedClasses: response.assignedClasses,
        assignedSubjects: response.assignedSubjects,
        studentCount: response.studentCount,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to update teacher');
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
      throw new Error(error.details || 'Failed to delete teacher');
    }
  }

  async createManyTeachers(
    data: CreateManyTeachersInput,
  ): Promise<CreateManyTeachersOutput> {
    try {
      const response = await lastValueFrom(
        this.teacherGrpcService.CreateManyTeachers(data),
      );
      return {
        teachers: response.teachers.map((teacher) => ({
          _id: teacher.id,
          schoolId: teacher.schoolId,
          email: teacher.email,
          phoneNumber: teacher.phoneNumber,
          address: teacher.address,
          subject: teacher.subject,
          qualifications: teacher.qualifications,
          hireDate: teacher.hireDate,
          profilePictureUrl: teacher.profilePictureUrl,
          status: teacher.status,
          dateOfBirth: teacher.dateOfBirth,
          gender: teacher.gender,
          nationality: teacher.nationality,
          socialMediaLinks: teacher.socialMediaLinks,
          emergencyContact: teacher.emergencyContact,
          salary: teacher.salary,
          teachingExperienceYears: teacher.teachingExperienceYears,
          assignedClasses: teacher.assignedClasses,
          assignedSubjects: teacher.assignedSubjects,
          studentCount: teacher.studentCount,
          createdAt: teacher.createdAt,
          updatedAt: teacher.updatedAt,
        })),
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create multiple teachers');
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
      throw new Error(error.details || 'Failed to delete multiple teachers');
    }
  }
}
