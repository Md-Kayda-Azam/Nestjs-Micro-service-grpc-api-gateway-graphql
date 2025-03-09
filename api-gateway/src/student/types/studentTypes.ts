import { Observable } from 'rxjs';

// Student response type
export interface GrpcStudentResponse {
  id: string;
  schoolId: string;
  dateOfBirth: string;
  gender: string;
  studentID: string;
  email: string;
  phoneNumber: string;
  address: string;
  admissionDate: string;
  enrollmentDate: string;
  classID: string;
  enrolledCourses: string[];
  grades: { [key: string]: number };
  extracurricularActivities: string[];
  parentID: string;
  nationality: string;
  graduationDate: string;
  profilePictureUrl: string;
  awards: string[];
  healthDetails: string;
  isSpecialNeeds: boolean;
  remarks: string;
  createdAt?: string;
  updatedAt?: string;
}

// Create student request
export interface CreateStudentRequest {
  schoolId: string;
  dateOfBirth: string;
  gender: string;
  studentID: string;
  email: string;
  phoneNumber: string;
  address: string;
  admissionDate: string;
  enrollmentDate: string;
  classID: string;
  enrolledCourses: string[];
  grades: { [key: string]: number };
  extracurricularActivities: string[];
  parentID: string;
  nationality: string;
  graduationDate: string;
  profilePictureUrl: string;
  awards: string[];
  healthDetails: string;
  isSpecialNeeds: boolean;
  remarks: string;
}

// Get all students request
export interface GetAllStudentsRequest {
  isActive: boolean;
  limit: number;
  offset: number;
}

// Get all students response
export interface GetAllStudentsResponse {
  students: GrpcStudentResponse[];
  total: number;
}

// Get student request
export interface GetStudentRequest {
  id: string;
}

// Update student request
export interface UpdateStudentRequest {
  id: string;
  schoolId: string;
  dateOfBirth: string;
  gender: string;
  studentID: string;
  email: string;
  phoneNumber: string;
  address: string;
  admissionDate: string;
  enrollmentDate: string;
  classID: string;
  enrolledCourses: string[];
  grades: { [key: string]: number };
  extracurricularActivities: string[];
  parentID: string;
  nationality: string;
  graduationDate: string;
  profilePictureUrl: string;
  awards: string[];
  healthDetails: string;
  isSpecialNeeds: boolean;
  remarks: string;
}

// Delete student request
export interface DeleteStudentRequest {
  id: string;
}

// Delete student response
export interface DeleteStudentResponse {
  success: boolean;
  message: string;
}

// Create many students request
export interface CreateManyStudentsRequest {
  students: CreateStudentRequest[];
}

// Create many students response
export interface CreateManyStudentsResponse {
  students: GrpcStudentResponse[];
}

// Delete many students request
export interface DeleteManyStudentsRequest {
  ids: string[];
}

// Delete many students response
export interface DeleteManyStudentsResponse {
  success: boolean;
  message: string;
}

// gRPC service interface
export interface StudentGrpcService {
  CreateStudent(data: CreateStudentRequest): Observable<GrpcStudentResponse>;
  GetAllStudents(
    data: GetAllStudentsRequest,
  ): Observable<GetAllStudentsResponse>;
  GetStudent(data: GetStudentRequest): Observable<GrpcStudentResponse>;
  UpdateStudent(data: UpdateStudentRequest): Observable<GrpcStudentResponse>;
  DeleteStudent(data: DeleteStudentRequest): Observable<DeleteStudentResponse>;
  CreateManyStudents(
    data: CreateManyStudentsRequest,
  ): Observable<CreateManyStudentsResponse>;
  DeleteManyStudents(
    data: DeleteManyStudentsRequest,
  ): Observable<DeleteManyStudentsResponse>;
}
