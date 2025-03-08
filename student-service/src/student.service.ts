import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentDocument, Student } from './schema/student.schema';
import { CreateStudentData, StudentResponse } from './types/studentTypes';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(data: CreateStudentData): Promise<StudentResponse> {
    const existingStudent = await this.studentModel
      .findOne({ studentID: data.studentID })
      .exec();
    if (existingStudent) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'A student with this studentID already exists',
      });
    }

    const newStudent = new this.studentModel({
      schoolId: data.schoolId,
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender,
      studentID: data.studentID,
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: data.address || undefined,
      admissionDate: new Date(data.admissionDate),
      enrollmentDate: new Date(data.enrollmentDate),
      classId: data.classId,
      enrolledCourses: data.enrolledCourses || [],
      grades: data.grades || new Map(),
      extracurricularActivities: data.extracurricularActivities || [],
      parentId: data.parentId || null,
      nationality: data.nationality,
      graduationDate: data.graduationDate
        ? new Date(data.graduationDate)
        : null,
      profilePictureUrl: data.profilePictureUrl || undefined,
      awards: data.awards || [],
      healthDetails: data.healthDetails || undefined,
      isSpecialNeeds:
        data.isSpecialNeeds !== undefined ? data.isSpecialNeeds : false,
      remarks: data.remarks || undefined,
    });

    const savedStudent = await newStudent.save();

    return {
      id: savedStudent._id.toString(),
      schoolId: savedStudent.schoolId,
      dateOfBirth: savedStudent.dateOfBirth.toISOString(),
      gender: savedStudent.gender,
      studentID: savedStudent.studentID,
      email: savedStudent.email,
      phoneNumber: savedStudent.phoneNumber,
      address: savedStudent.address,
      admissionDate: savedStudent.admissionDate.toISOString(),
      enrollmentDate: savedStudent.enrollmentDate.toISOString(),
      classId: savedStudent.classId,
      enrolledCourses: savedStudent.enrolledCourses,
      grades: Object.fromEntries(savedStudent.grades),
      extracurricularActivities: savedStudent.extracurricularActivities,
      parentId: savedStudent.parentId,
      nationality: savedStudent.nationality,
      graduationDate: savedStudent.graduationDate
        ? savedStudent.graduationDate.toISOString()
        : null,
      profilePictureUrl: savedStudent.profilePictureUrl,
      awards: savedStudent.awards,
      healthDetails: savedStudent.healthDetails,
      isSpecialNeeds: savedStudent.isSpecialNeeds,
      remarks: savedStudent.remarks,
      createdAt: savedStudent.createdAt.toISOString(),
      updatedAt: savedStudent.updatedAt.toISOString(),
    };
  }

  async getAllStudents(data: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<{ students: StudentResponse[]; total: number }> {
    try {
      const filter: any = {};
      // isActive ফিল্টার স্কিমায় নেই, তবে জেনেরিক ফিল্টার হিসেবে ব্যবহার করা যেতে পারে
      const limit = data.limit ? Math.min(data.limit, 100) : 10;
      const offset = data.offset || 0;

      const total = await this.studentModel.countDocuments(filter).exec();
      const students = await this.studentModel
        .find(filter)
        .skip(offset)
        .limit(limit)
        .exec();

      return {
        students: students.map((s) => ({
          id: s._id.toString(),
          schoolId: s.schoolId,
          dateOfBirth: s.dateOfBirth.toISOString(),
          gender: s.gender,
          studentID: s.studentID,
          email: s.email,
          phoneNumber: s.phoneNumber,
          address: s.address,
          admissionDate: s.admissionDate.toISOString(),
          enrollmentDate: s.enrollmentDate.toISOString(),
          classId: s.classId,
          enrolledCourses: s.enrolledCourses,
          grades: Object.fromEntries(s.grades),
          extracurricularActivities: s.extracurricularActivities,
          parentId: s.parentId,
          nationality: s.nationality,
          graduationDate: s.graduationDate
            ? s.graduationDate.toISOString()
            : null,
          profilePictureUrl: s.profilePictureUrl,
          awards: s.awards,
          healthDetails: s.healthDetails,
          isSpecialNeeds: s.isSpecialNeeds,
          remarks: s.remarks,
          createdAt: s.createdAt.toISOString(),
          updatedAt: s.updatedAt.toISOString(),
        })),
        total,
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch students',
      });
    }
  }

  async getStudent(data: { id: string }): Promise<StudentResponse> {
    try {
      const student = await this.studentModel.findById(data.id).exec();
      if (!student) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'Student not found',
        });
      }

      return {
        id: student._id.toString(),
        schoolId: student.schoolId,
        dateOfBirth: student.dateOfBirth.toISOString(),
        gender: student.gender,
        studentID: student.studentID,
        email: student.email,
        phoneNumber: student.phoneNumber,
        address: student.address,
        admissionDate: student.admissionDate.toISOString(),
        enrollmentDate: student.enrollmentDate.toISOString(),
        classId: student.classId,
        enrolledCourses: student.enrolledCourses,
        grades: Object.fromEntries(student.grades),
        extracurricularActivities: student.extracurricularActivities,
        parentId: student.parentId,
        nationality: student.nationality,
        graduationDate: student.graduationDate
          ? student.graduationDate.toISOString()
          : null,
        profilePictureUrl: student.profilePictureUrl,
        awards: student.awards,
        healthDetails: student.healthDetails,
        isSpecialNeeds: student.isSpecialNeeds,
        remarks: student.remarks,
        createdAt: student.createdAt.toISOString(),
        updatedAt: student.updatedAt.toISOString(),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch student',
      });
    }
  }

  async updateStudent(
    data: { id: string } & Partial<CreateStudentData>,
  ): Promise<StudentResponse> {
    try {
      const updateData: Partial<Student> = {
        schoolId: data.schoolId,
        parentId: data.parentId,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
        studentID: data.studentID,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address ? data.address : undefined,
        admissionDate: data.admissionDate
          ? new Date(data.admissionDate)
          : undefined,
        enrollmentDate: data.enrollmentDate
          ? new Date(data.enrollmentDate)
          : undefined,
        classId: data.classId,
        enrolledCourses: data.enrolledCourses,
        grades: data.grades ? new Map(Object.entries(data.grades)) : undefined,
        extracurricularActivities: data.extracurricularActivities,
        nationality: data.nationality,
        graduationDate: data.graduationDate
          ? new Date(data.graduationDate)
          : undefined,
        profilePictureUrl: data.profilePictureUrl
          ? data.profilePictureUrl
          : undefined,
        awards: data.awards,
        healthDetails: data.healthDetails ? data.healthDetails : undefined,
        isSpecialNeeds: data.isSpecialNeeds,
        remarks: data.remarks ? data.remarks : undefined,
      };

      const student = await this.studentModel
        .findByIdAndUpdate(data.id, updateData, { new: true })
        .exec();
      if (!student) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'Student not found',
        });
      }

      return {
        id: student._id.toString(),
        schoolId: student.schoolId,
        dateOfBirth: student.dateOfBirth.toISOString(),
        gender: student.gender,
        studentID: student.studentID,
        email: student.email,
        phoneNumber: student.phoneNumber,
        address: student.address,
        admissionDate: student.admissionDate.toISOString(),
        enrollmentDate: student.enrollmentDate.toISOString(),
        classId: student.classId,
        enrolledCourses: student.enrolledCourses,
        grades: Object.fromEntries(student.grades),
        extracurricularActivities: student.extracurricularActivities,
        parentId: student.parentId,
        nationality: student.nationality,
        graduationDate: student.graduationDate
          ? student.graduationDate.toISOString()
          : null,
        profilePictureUrl: student.profilePictureUrl,
        awards: student.awards,
        healthDetails: student.healthDetails,
        isSpecialNeeds: student.isSpecialNeeds,
        remarks: student.remarks,
        createdAt: student.createdAt.toISOString(),
        updatedAt: student.updatedAt.toISOString(),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update student',
      });
    }
  }

  async deleteStudent(data: {
    id: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.studentModel.findByIdAndDelete(data.id).exec();
      if (!result) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'Student not found',
        });
      }

      return {
        success: true,
        message: 'Student deleted successfully',
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete student',
      });
    }
  }

  async createManyStudents(data: {
    students: CreateStudentData[];
  }): Promise<{ students: StudentResponse[] }> {
    try {
      const studentsToCreate = data.students.map((s) => ({
        schoolId: s.schoolId,
        dateOfBirth: new Date(s.dateOfBirth),
        gender: s.gender,
        studentID: s.studentID,
        email: s.email,
        phoneNumber: s.phoneNumber,
        address: s.address || undefined,
        admissionDate: new Date(s.admissionDate),
        enrollmentDate: new Date(s.enrollmentDate),
        classId: s.classId,
        enrolledCourses: s.enrolledCourses || [],
        grades: s.grades ? new Map(Object.entries(s.grades)) : new Map(),
        extracurricularActivities: s.extracurricularActivities || [],
        parentId: s.parentId,
        nationality: s.nationality,
        graduationDate: s.graduationDate ? new Date(s.graduationDate) : null,
        profilePictureUrl: s.profilePictureUrl || undefined,
        awards: s.awards || [],
        healthDetails: s.healthDetails || undefined,
        isSpecialNeeds:
          s.isSpecialNeeds !== undefined ? s.isSpecialNeeds : false,
        remarks: s.remarks || undefined,
      }));

      const savedStudents =
        await this.studentModel.insertMany(studentsToCreate);

      return {
        students: savedStudents.map((s) => ({
          id: s._id.toString(),
          schoolId: s.schoolId,
          dateOfBirth: s.dateOfBirth.toISOString(),
          gender: s.gender,
          studentID: s.studentID,
          email: s.email,
          phoneNumber: s.phoneNumber,
          address: s.address,
          admissionDate: s.admissionDate.toISOString(),
          enrollmentDate: s.enrollmentDate.toISOString(),
          classId: s.classId,
          enrolledCourses: s.enrolledCourses,
          grades: Object.fromEntries(s.grades),
          extracurricularActivities: s.extracurricularActivities,
          parentId: s.parentId,
          nationality: s.nationality,
          graduationDate: s.graduationDate
            ? s.graduationDate.toISOString()
            : null,
          profilePictureUrl: s.profilePictureUrl,
          awards: s.awards,
          healthDetails: s.healthDetails,
          isSpecialNeeds: s.isSpecialNeeds,
          remarks: s.remarks,
          createdAt: s.createdAt.toISOString(),
          updatedAt: s.updatedAt.toISOString(),
        })),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create multiple students',
      });
    }
  }

  async deleteManyStudents(data: {
    ids: string[];
  }): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.studentModel
        .deleteMany({ _id: { $in: data.ids } })
        .exec();

      if (result.deletedCount === 0) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'No students found to delete',
        });
      }

      return {
        success: true,
        message: `${result.deletedCount} students deleted successfully`,
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete multiple students',
      });
    }
  }
}
