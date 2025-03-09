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
  socialMediaLinks: { [key: string]: string };
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
  socialMediaLinks: { [key: string]: string };
  emergencyContact: string;
  salary: number;
  teachingExperienceYears: number;
  assignedClasses: string[];
  assignedSubjects: string[];
  studentCount: number;
}

// Get all teachers request
export interface GetAllTeachersRequest {
  status: string;
  limit: number;
  offset: number;
}

// Get all teachers response
export interface GetAllTeachersResponse {
  teachers: GrpcTeacherResponse[];
  total: number;
}

// Get teacher request
export interface GetTeacherRequest {
  id: string;
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
  socialMediaLinks: { [key: string]: string };
  emergencyContact: string;
  salary: number;
  teachingExperienceYears: number;
  assignedClasses: string[];
  assignedSubjects: string[];
  studentCount: number;
}

// Delete teacher request
export interface DeleteTeacherRequest {
  id: string;
}

// Delete teacher response
export interface DeleteTeacherResponse {
  success: boolean;
  message: string;
}

// Create many teachers request
export interface CreateManyTeachersRequest {
  teachers: CreateTeacherRequest[];
}

// Create many teachers response
export interface CreateManyTeachersResponse {
  teachers: GrpcTeacherResponse[];
}

// Delete many teachers request
export interface DeleteManyTeachersRequest {
  ids: string[];
}

// Delete many teachers response
export interface DeleteManyTeachersResponse {
  success: boolean;
  message: string;
}

// gRPC service interface
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
