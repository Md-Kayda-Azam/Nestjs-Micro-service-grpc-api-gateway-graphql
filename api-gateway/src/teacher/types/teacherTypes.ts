import { Observable } from 'rxjs';

// Teacher response type
export interface GrpcTeacherResponse {
  id: string;
  schoolId: string;
  email: string;
  phoneNumber: string;
  address: string;
  subject: string;
  qualifications: string[];
  hireDate: string;
  profilePictureUrl: string;
  status: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  socialMediaLinks: {
    // Update this
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  emergencyContact: string;
  salary: number;
  teachingExperienceYears: number;
  assignedClasses: string[];
  assignedSubjects: string[];
  studentCount: number;
  createdAt?: string;
  updatedAt?: string;
}

// Create teacher request
export interface CreateTeacherRequest {
  schoolId: string;
  email: string;
  phoneNumber: string;
  address: string;
  subject: string;
  qualifications: string[];
  hireDate: string;
  profilePictureUrl: string;
  status: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  socialMediaLinks: {
    // Update this
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  emergencyContact: string;
  salary: number;
  teachingExperienceYears: number;
  assignedClasses: string[];
  assignedSubjects: string[];
  studentCount: number;
}

// Update teacher request
export interface UpdateTeacherRequest {
  id: string;
  schoolId: string;
  email: string;
  phoneNumber: string;
  address: string;
  subject: string;
  qualifications: string[];
  hireDate: string;
  profilePictureUrl: string;
  status: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  socialMediaLinks: {
    // Update this
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  emergencyContact: string;
  salary: number;
  teachingExperienceYears: number;
  assignedClasses: string[];
  assignedSubjects: string[];
  studentCount: number;
}

// Rest of the interfaces remain the same
export interface GetAllTeachersRequest {
  status: string;
  limit: number;
  offset: number;
}

export interface GetAllTeachersResponse {
  teachers: GrpcTeacherResponse[];
  total: number;
}

export interface GetTeacherRequest {
  id: string;
}

export interface DeleteTeacherRequest {
  id: string;
}

export interface DeleteTeacherResponse {
  success: boolean;
  message: string;
}

export interface CreateManyTeachersRequest {
  teachers: CreateTeacherRequest[];
}

export interface CreateManyTeachersResponse {
  teachers: GrpcTeacherResponse[];
}

export interface DeleteManyTeachersRequest {
  ids: string[];
}

export interface DeleteManyTeachersResponse {
  success: boolean;
  message: string;
}

export interface TeacherGrpcService {
  CreateTeacher(data: CreateTeacherRequest): Observable<GrpcTeacherResponse>;
  GetAllTeachers(
    data: GetAllTeachersRequest,
  ): Observable<GetAllTeachersResponse>;
  GetTeacher(data: GetTeacherRequest): Observable<GrpcTeacherResponse>;
  UpdateTeacher(data: UpdateTeacherRequest): Observable<GrpcTeacherResponse>;
  DeleteTeacher(data: DeleteTeacherRequest): Observable<DeleteTeacherResponse>;
  CreateManyTeachers(
    data: CreateManyTeachersRequest,
  ): Observable<CreateManyTeachersResponse>;
  DeleteManyTeachers(
    data: DeleteManyTeachersRequest,
  ): Observable<DeleteManyTeachersResponse>;
}
