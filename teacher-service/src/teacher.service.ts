import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeacherDocument, Teacher } from './schema/teacher.schema';
import { CreateTeacherData, TeacherResponse } from './types/teacherTypes';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name)
    private teacherModel: Model<TeacherDocument>,
  ) {}

  async createTeacher(data: CreateTeacherData): Promise<TeacherResponse> {
    const existingTeacher = await this.teacherModel
      .findOne({ email: data.email })
      .exec();
    if (existingTeacher) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'A teacher with this email already exists',
      });
    }

    const newTeacher = new this.teacherModel({
      schoolId: data.schoolId,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address,
      subject: data.subject,
      qualifications: data.qualifications || [],
      hireDate: new Date(data.hireDate),
      profilePictureUrl: data.profilePictureUrl,
      status: data.status,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      gender: data.gender,
      nationality: data.nationality,
      socialMediaLinks: data.socialMediaLinks,
      emergencyContact: data.emergencyContact,
      salary: data.salary ?? null,
      teachingExperienceYears: data.teachingExperienceYears ?? 0,
      assignedClasses: data.assignedClasses || [],
      assignedSubjects: data.assignedSubjects || [],
      studentCount: data.studentCount ?? 0,
    });

    const savedTeacher = await newTeacher.save();

    return {
      id: savedTeacher._id.toString(),
      schoolId: savedTeacher.schoolId,
      email: savedTeacher.email,
      phoneNumber: savedTeacher.phoneNumber,
      address: savedTeacher.address,
      subject: savedTeacher.subject,
      qualifications: savedTeacher.qualifications,
      hireDate: savedTeacher.hireDate.toISOString(),
      profilePictureUrl: savedTeacher.profilePictureUrl,
      status: savedTeacher.status,
      dateOfBirth: savedTeacher.dateOfBirth
        ? savedTeacher.dateOfBirth.toISOString()
        : null,
      gender: savedTeacher.gender,
      nationality: savedTeacher.nationality,
      socialMediaLinks: savedTeacher.socialMediaLinks,
      emergencyContact: savedTeacher.emergencyContact,
      salary: savedTeacher.salary,
      teachingExperienceYears: savedTeacher.teachingExperienceYears,
      assignedClasses: savedTeacher.assignedClasses,
      assignedSubjects: savedTeacher.assignedSubjects,
      studentCount: savedTeacher.studentCount,
      createdAt: savedTeacher.createdAt.toISOString(),
      updatedAt: savedTeacher.updatedAt.toISOString(),
    };
  }

  async getAllTeachers(data: {
    status?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ teachers: TeacherResponse[]; total: number }> {
    try {
      const filter: any = {};
      if (data.status) {
        filter.status = data.status;
      }

      const limit = data.limit ? Math.min(data.limit, 100) : 10;
      const offset = data.offset || 0;

      const total = await this.teacherModel.countDocuments(filter).exec();
      const teachers = await this.teacherModel
        .find(filter)
        .skip(offset)
        .limit(limit)
        .exec();

      return {
        teachers: teachers.map((t) => ({
          id: t._id.toString(),
          schoolId: t.schoolId,
          email: t.email,
          phoneNumber: t.phoneNumber,
          address: t.address,
          subject: t.subject,
          qualifications: t.qualifications,
          hireDate: t.hireDate.toISOString(),
          profilePictureUrl: t.profilePictureUrl,
          status: t.status,
          dateOfBirth: t.dateOfBirth ? t.dateOfBirth.toISOString() : null,
          gender: t.gender,
          nationality: t.nationality,
          socialMediaLinks: t.socialMediaLinks,
          emergencyContact: t.emergencyContact,
          salary: t.salary,
          teachingExperienceYears: t.teachingExperienceYears,
          assignedClasses: t.assignedClasses,
          assignedSubjects: t.assignedSubjects,
          studentCount: t.studentCount,
          createdAt: t.createdAt.toISOString(),
          updatedAt: t.updatedAt.toISOString(),
        })),
        total,
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch teachers',
      });
    }
  }

  async getTeacher(data: { id: string }): Promise<TeacherResponse> {
    try {
      const teacher = await this.teacherModel.findById(data.id).exec();
      if (!teacher) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'Teacher not found',
        });
      }

      return {
        id: teacher._id.toString(),
        schoolId: teacher.schoolId,
        email: teacher.email,
        phoneNumber: teacher.phoneNumber,
        address: teacher.address,
        subject: teacher.subject,
        qualifications: teacher.qualifications,
        hireDate: teacher.hireDate.toISOString(),
        profilePictureUrl: teacher.profilePictureUrl,
        status: teacher.status,
        dateOfBirth: teacher.dateOfBirth
          ? teacher.dateOfBirth.toISOString()
          : null,
        gender: teacher.gender,
        nationality: teacher.nationality,
        socialMediaLinks: teacher.socialMediaLinks,
        emergencyContact: teacher.emergencyContact,
        salary: teacher.salary,
        teachingExperienceYears: teacher.teachingExperienceYears,
        assignedClasses: teacher.assignedClasses,
        assignedSubjects: teacher.assignedSubjects,
        studentCount: teacher.studentCount,
        createdAt: teacher.createdAt.toISOString(),
        updatedAt: teacher.updatedAt.toISOString(),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch teacher',
      });
    }
  }

  async updateTeacher(
    data: { id: string } & Partial<CreateTeacherData>,
  ): Promise<TeacherResponse> {
    try {
      const updateData: Partial<Teacher> = {
        schoolId: data.schoolId,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address ? data.address : undefined,
        subject: data.subject,
        qualifications: data.qualifications,
        hireDate: data.hireDate ? new Date(data.hireDate) : undefined,
        profilePictureUrl: data.profilePictureUrl
          ? data.profilePictureUrl
          : undefined,
        status: data.status,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
        nationality: data.nationality,
        socialMediaLinks: data.socialMediaLinks
          ? data.socialMediaLinks
          : undefined,
        emergencyContact: data.emergencyContact
          ? data.emergencyContact
          : undefined,
        salary: data.salary ? data.salary : undefined,
        teachingExperienceYears: data.teachingExperienceYears,
        assignedClasses: data.assignedClasses,
        assignedSubjects: data.assignedSubjects,
        studentCount: data.studentCount,
      };

      const teacher = await this.teacherModel
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .exec();
      if (!teacher) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'Teacher not found',
        });
      }

      return {
        id: teacher._id.toString(),
        schoolId: teacher.schoolId,
        email: teacher.email,
        phoneNumber: teacher.phoneNumber,
        address: teacher.address,
        subject: teacher.subject,
        qualifications: teacher.qualifications,
        hireDate: teacher.hireDate.toISOString(),
        profilePictureUrl: teacher.profilePictureUrl,
        status: teacher.status,
        dateOfBirth: teacher.dateOfBirth
          ? teacher.dateOfBirth.toISOString()
          : null,
        gender: teacher.gender,
        nationality: teacher.nationality,
        socialMediaLinks: teacher.socialMediaLinks,
        emergencyContact: teacher.emergencyContact,
        salary: teacher.salary,
        teachingExperienceYears: teacher.teachingExperienceYears,
        assignedClasses: teacher.assignedClasses,
        assignedSubjects: teacher.assignedSubjects,
        studentCount: teacher.studentCount,
        createdAt: teacher.createdAt.toISOString(),
        updatedAt: teacher.updatedAt.toISOString(),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update teacher',
      });
    }
  }

  async deleteTeacher(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.teacherModel.findByIdAndDelete(data.id).exec();
      if (!result) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'Teacher not found',
        });
      }

      return {
        success: true,
        message: 'Teacher deleted successfully',
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete teacher',
      });
    }
  }

  async createManyTeachers(data: {
    teachers: CreateTeacherData[];
  }): Promise<{ teachers: TeacherResponse[] }> {
    try {
      const teachersToCreate = data.teachers.map((t) => ({
        schoolId: t.schoolId,
        email: t.email,
        phoneNumber: t.phoneNumber,
        address: t.address,
        subject: t.subject,
        qualifications: t.qualifications || [],
        hireDate: new Date(t.hireDate),
        profilePictureUrl: t.profilePictureUrl,
        status: t.status,
        dateOfBirth: t.dateOfBirth ? new Date(t.dateOfBirth) : null,
        gender: t.gender,
        nationality: t.nationality,
        socialMediaLinks: t.socialMediaLinks,
        emergencyContact: t.emergencyContact,
        salary: t.salary ?? null,
        teachingExperienceYears: t.teachingExperienceYears ?? 0,
        assignedClasses: t.assignedClasses || [],
        assignedSubjects: t.assignedSubjects || [],
        studentCount: t.studentCount ?? 0,
      }));

      const savedTeachers =
        await this.teacherModel.insertMany(teachersToCreate);

      return {
        teachers: savedTeachers.map((t) => ({
          id: t._id.toString(),
          schoolId: t.schoolId,
          email: t.email,
          phoneNumber: t.phoneNumber,
          address: t.address,
          subject: t.subject,
          qualifications: t.qualifications,
          hireDate: t.hireDate.toISOString(),
          profilePictureUrl: t.profilePictureUrl,
          status: t.status,
          dateOfBirth: t.dateOfBirth ? t.dateOfBirth.toISOString() : null,
          gender: t.gender,
          nationality: t.nationality,
          socialMediaLinks: t.socialMediaLinks ? t.socialMediaLinks : null,
          emergencyContact: t.emergencyContact,
          salary: t.salary,
          teachingExperienceYears: t.teachingExperienceYears,
          assignedClasses: t.assignedClasses,
          assignedSubjects: t.assignedSubjects,
          studentCount: t.studentCount,
          createdAt: t.createdAt.toISOString(),
          updatedAt: t.updatedAt.toISOString(),
        })),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple teachers',
      });
    }
  }

  async deleteManyTeachers(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.teacherModel
        .deleteMany({ _id: { $in: data.ids } })
        .exec();

      if (result.deletedCount === 0) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'No teachers found to delete',
        });
      }

      return {
        success: true,
        message: `${result.deletedCount} teachers deleted successfully`,
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple teachers',
      });
    }
  }
}
