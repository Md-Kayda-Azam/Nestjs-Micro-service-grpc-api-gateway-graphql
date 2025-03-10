import { Observable } from 'rxjs';

// GradeEntry interface for grades
export interface GradeEntry {
  courseId: string;
  grade: number;
}

// StudentResponse interface for gRPC response
export interface StudentResponse {
  id: string;
  schoolId: string;
  dateOfBirth: string; // ISO string
  gender: string;
  studentID: string;
  email: string;
  phoneNumber: string;
  address: string | null | undefined;
  admissionDate: string; // ISO string
  enrollmentDate: string; // ISO string
  classId: string;
  enrolledCourses: string[];
  grades: GradeEntry[];
  extracurricularActivities: string[];
  parentId: string;
  nationality: string;
  graduationDate: string | null;
  profilePictureUrl: string | null | undefined;
  awards: string[];
  healthDetails: string | null | undefined;
  isSpecialNeeds: boolean;
  remarks: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}

// CreateStudentData interface for gRPC request
export interface CreateStudentData {
  schoolId: string;
  dateOfBirth: string; // ISO string
  gender: string;
  studentID: string;
  email: string;
  phoneNumber: string;
  address?: string | null | undefined;
  admissionDate: string; // ISO string
  enrollmentDate: string; // ISO string
  classId: string;
  enrolledCourses?: string[];
  grades?: GradeEntry[];
  extracurricularActivities?: string[];
  parentId: string;
  nationality: string;
  graduationDate?: string | null;
  profilePictureUrl?: string | null | undefined;
  awards?: string[];
  healthDetails?: string | null | undefined;
  isSpecialNeeds?: boolean;
  remarks?: string | null | undefined;
}

// GetAllStudentsRequest interface
export interface GetAllStudentsRequest {
  isActive: boolean;
  limit: number;
  offset: number;
}

// GetAllStudentsResponse interface
export interface GetAllStudentsResponse {
  students: StudentResponse[];
  total: number;
}

// GetStudentRequest interface
export interface GetStudentRequest {
  id: string;
}

// UpdateStudentRequest interface
export interface UpdateStudentRequest {
  id: string;
  schoolId?: string;
  dateOfBirth?: string; // ISO string
  gender?: string;
  studentID?: string;
  email?: string;
  phoneNumber?: string;
  address?: string | null | undefined;
  admissionDate?: string; // ISO string
  enrollmentDate?: string; // ISO string
  classId?: string;
  enrolledCourses?: string[];
  grades?: GradeEntry[];
  extracurricularActivities?: string[];
  parentId?: string;
  nationality?: string;
  graduationDate?: string | null;
  profilePictureUrl?: string | null | undefined;
  awards?: string[];
  healthDetails?: string | null | undefined;
  isSpecialNeeds?: boolean;
  remarks?: string | null | undefined;
}

// DeleteStudentRequest interface
export interface DeleteStudentRequest {
  id: string;
}

// DeleteStudentResponse interface
export interface DeleteStudentResponse {
  success: boolean;
  message: string;
}

// CreateManyStudentsRequest interface
export interface CreateManyStudentsRequest {
  students: CreateStudentData[];
}

// CreateManyStudentsResponse interface
export interface CreateManyStudentsResponse {
  students: StudentResponse[];
}

// DeleteManyStudentsRequest interface
export interface DeleteManyStudentsRequest {
  ids: string[];
}

// DeleteManyStudentsResponse interface
export interface DeleteManyStudentsResponse {
  success: boolean;
  message: string;
}

// StudentGrpcService interface for gRPC service
export interface StudentGrpcService {
  CreateStudent(data: CreateStudentData): Observable<StudentResponse>;
  GetAllStudents(
    data: GetAllStudentsRequest,
  ): Observable<GetAllStudentsResponse>;
  GetStudent(data: GetStudentRequest): Observable<StudentResponse>;
  UpdateStudent(data: UpdateStudentRequest): Observable<StudentResponse>;
  DeleteStudent(data: DeleteStudentRequest): Observable<DeleteStudentResponse>;
  CreateManyStudents(
    data: CreateManyStudentsRequest,
  ): Observable<CreateManyStudentsResponse>;
  DeleteManyStudents(
    data: DeleteManyStudentsRequest,
  ): Observable<DeleteManyStudentsResponse>;
}
