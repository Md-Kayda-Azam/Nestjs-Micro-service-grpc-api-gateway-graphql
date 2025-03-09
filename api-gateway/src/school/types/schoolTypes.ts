import { Observable } from 'rxjs';

// School response type
export interface GrpcSchoolResponse {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  courses: string[];
  principal: string;
  website: string;
  isActive: boolean;
  staff: string[];
  logoUrl: string;
  studentCount: number;
  teacherCount: number;
  establishedYear: number;
  schoolType: string;
  region: string;
  extracurricularActivities: string[];
  affiliations: string[];
  accreditationStatus: string;
  country: string;
  city: string;
  postalCode: string;
  socialMediaLinks: { [key: string]: string };
  lastInspectionDate: string;
  totalCampusArea: number;
  numberOfBuildings: number;
  languagesOffered: string[];
  studentTeacherRatio: number;
  schoolLogo: string;
  isOnlineLearningAvailable: boolean;
  numberOfClassrooms: number;
  schoolEvents: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Create school request
export interface CreateSchoolRequest {
  name: string;
  address: string;
  phoneNumber: string;
  courses: string[];
  principal: string;
  website: string;
  isActive: boolean;
  staff: string[];
  logoUrl: string;
  studentCount: number;
  teacherCount: number;
  establishedYear: number;
  schoolType: string;
  region: string;
  extracurricularActivities: string[];
  affiliations: string[];
  accreditationStatus: string;
  country: string;
  city: string;
  postalCode: string;
  socialMediaLinks: { [key: string]: string };
  lastInspectionDate: string;
  totalCampusArea: number;
  numberOfBuildings: number;
  languagesOffered: string[];
  studentTeacherRatio: number;
  schoolLogo: string;
  isOnlineLearningAvailable: boolean;
  numberOfClassrooms: number;
  schoolEvents: string[];
}

// Get all schools request
export interface GetAllSchoolsRequest {
  isActive: boolean;
  limit: number;
  offset: number;
}

// Get all schools response
export interface GetAllSchoolsResponse {
  schools: GrpcSchoolResponse[];
  total: number;
}

// Get school request
export interface GetSchoolRequest {
  id: string;
}

// Update school request
export interface UpdateSchoolRequest {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  courses: string[];
  principal: string;
  website: string;
  isActive: boolean;
  staff: string[];
  logoUrl: string;
  studentCount: number;
  teacherCount: number;
  establishedYear: number;
  schoolType: string;
  region: string;
  extracurricularActivities: string[];
  affiliations: string[];
  accreditationStatus: string;
  country: string;
  city: string;
  postalCode: string;
  socialMediaLinks: { [key: string]: string };
  lastInspectionDate: string;
  totalCampusArea: number;
  numberOfBuildings: number;
  languagesOffered: string[];
  studentTeacherRatio: number;
  schoolLogo: string;
  isOnlineLearningAvailable: boolean;
  numberOfClassrooms: number;
  schoolEvents: string[];
}

// Delete school request
export interface DeleteSchoolRequest {
  id: string;
}

// Delete school response
export interface DeleteSchoolResponse {
  success: boolean;
  message: string;
}

// Create many schools request
export interface CreateManySchoolsRequest {
  schools: CreateSchoolRequest[];
}

// Create many schools response
export interface CreateManySchoolsResponse {
  schools: GrpcSchoolResponse[];
}

// Delete many schools request
export interface DeleteManySchoolsRequest {
  ids: string[];
}

// Delete many schools response
export interface DeleteManySchoolsResponse {
  success: boolean;
  message: string;
}

// gRPC service interface
export interface SchoolGrpcService {
  CreateSchool(data: CreateSchoolRequest): Observable<GrpcSchoolResponse>;
  GetAllSchools(data: GetAllSchoolsRequest): Observable<GetAllSchoolsResponse>;
  GetSchool(data: GetSchoolRequest): Observable<GrpcSchoolResponse>;
  UpdateSchool(data: UpdateSchoolRequest): Observable<GrpcSchoolResponse>;
  DeleteSchool(data: DeleteSchoolRequest): Observable<DeleteSchoolResponse>;
  CreateManySchools(
    data: CreateManySchoolsRequest,
  ): Observable<CreateManySchoolsResponse>;
  DeleteManySchools(
    data: DeleteManySchoolsRequest,
  ): Observable<DeleteManySchoolsResponse>;
}
