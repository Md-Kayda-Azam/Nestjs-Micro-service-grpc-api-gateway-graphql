import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
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

  async createStudent(data: CreateStudentInput): Promise<Student> {
    try {
      const response = await lastValueFrom(
        this.studentGrpcService.CreateStudent(data),
      );
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
        classID: response.classID,
        enrolledCourses: response.enrolledCourses,
        grades: response.grades,
        extracurricularActivities: response.extracurricularActivities,
        parentID: response.parentID,
        nationality: response.nationality,
        graduationDate: response.graduationDate,
        profilePictureUrl: response.profilePictureUrl,
        awards: response.awards,
        healthDetails: response.healthDetails,
        isSpecialNeeds: response.isSpecialNeeds,
        remarks: response.remarks,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create student');
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
        students: response.students.map((student) => ({
          _id: student.id,
          schoolId: student.schoolId,
          dateOfBirth: student.dateOfBirth,
          gender: student.gender,
          studentID: student.studentID,
          email: student.email,
          phoneNumber: student.phoneNumber,
          address: student.address,
          admissionDate: student.admissionDate,
          enrollmentDate: student.enrollmentDate,
          classID: student.classID,
          enrolledCourses: student.enrolledCourses,
          grades: student.grades,
          extracurricularActivities: student.extracurricularActivities,
          parentID: student.parentID,
          nationality: student.nationality,
          graduationDate: student.graduationDate,
          profilePictureUrl: student.profilePictureUrl,
          awards: student.awards,
          healthDetails: student.healthDetails,
          isSpecialNeeds: student.isSpecialNeeds,
          remarks: student.remarks,
          createdAt: student.createdAt,
          updatedAt: student.updatedAt,
        })),
        total: response.total,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch students');
    }
  }

  async getStudent(id: string): Promise<Student> {
    try {
      const response = await lastValueFrom(
        this.studentGrpcService.GetStudent({ id }),
      );
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
        classID: response.classID,
        enrolledCourses: response.enrolledCourses,
        grades: response.grades,
        extracurricularActivities: response.extracurricularActivities,
        parentID: response.parentID,
        nationality: response.nationality,
        graduationDate: response.graduationDate,
        profilePictureUrl: response.profilePictureUrl,
        awards: response.awards,
        healthDetails: response.healthDetails,
        isSpecialNeeds: response.isSpecialNeeds,
        remarks: response.remarks,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch student');
    }
  }

  async updateStudent(data: UpdateStudentInput): Promise<Student> {
    try {
      const response = await lastValueFrom(
        this.studentGrpcService.UpdateStudent(data),
      );
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
        classID: response.classID,
        enrolledCourses: response.enrolledCourses,
        grades: response.grades,
        extracurricularActivities: response.extracurricularActivities,
        parentID: response.parentID,
        nationality: response.nationality,
        graduationDate: response.graduationDate,
        profilePictureUrl: response.profilePictureUrl,
        awards: response.awards,
        healthDetails: response.healthDetails,
        isSpecialNeeds: response.isSpecialNeeds,
        remarks: response.remarks,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to update student');
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
      throw new Error(error.details || 'Failed to delete student');
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
        students: response.students.map((student) => ({
          _id: student.id,
          schoolId: student.schoolId,
          dateOfBirth: student.dateOfBirth,
          gender: student.gender,
          studentID: student.studentID,
          email: student.email,
          phoneNumber: student.phoneNumber,
          address: student.address,
          admissionDate: student.admissionDate,
          enrollmentDate: student.enrollmentDate,
          classID: student.classID,
          enrolledCourses: student.enrolledCourses,
          grades: student.grades,
          extracurricularActivities: student.extracurricularActivities,
          parentID: student.parentID,
          nationality: student.nationality,
          graduationDate: student.graduationDate,
          profilePictureUrl: student.profilePictureUrl,
          awards: student.awards,
          healthDetails: student.healthDetails,
          isSpecialNeeds: student.isSpecialNeeds,
          remarks: student.remarks,
          createdAt: student.createdAt,
          updatedAt: student.updatedAt,
        })),
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create multiple students');
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
      throw new Error(error.details || 'Failed to delete multiple students');
    }
  }
}
