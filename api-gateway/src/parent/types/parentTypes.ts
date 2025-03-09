import { Observable } from 'rxjs';

// Parent response type
export interface GrpcParentResponse {
  id: string;
  schoolId: string;
  relationshipToStudent: string;
  phoneNumber: string;
  email: string;
  address: string;
  occupation: string;
  emergencyContacts: string[];
  profilePictureUrl: string;
  associatedStudents: string[];
  isPrimaryGuardian: boolean;
  notes: string;
  createdAt?: string;
  updatedAt?: string;
}

// Create parent request
export interface CreateParentRequest {
  schoolId: string;
  relationshipToStudent: string;
  phoneNumber: string;
  email: string;
  address: string;
  occupation: string;
  emergencyContacts: string[];
  profilePictureUrl: string;
  associatedStudents: string[];
  isPrimaryGuardian: boolean;
  notes: string;
}

// Get all parents request
export interface GetAllParentsRequest {
  schoolId: string;
  limit: number;
  offset: number;
}

// Get all parents response
export interface GetAllParentsResponse {
  parents: GrpcParentResponse[];
  total: number;
}

// Get parent request
export interface GetParentRequest {
  id: string;
}

// Update parent request
export interface UpdateParentRequest {
  id: string;
  schoolId: string;
  relationshipToStudent: string;
  phoneNumber: string;
  email: string;
  address: string;
  occupation: string;
  emergencyContacts: string[];
  profilePictureUrl: string;
  associatedStudents: string[];
  isPrimaryGuardian: boolean;
  notes: string;
}

// Delete parent request
export interface DeleteParentRequest {
  id: string;
}

// Delete parent response
export interface DeleteParentResponse {
  success: boolean;
  message: string;
}

// Create many parents request
export interface CreateManyParentsRequest {
  parents: CreateParentRequest[];
}

// Create many parents response
export interface CreateManyParentsResponse {
  parents: GrpcParentResponse[];
}

// Delete many parents request
export interface DeleteManyParentsRequest {
  ids: string[];
}

// Delete many parents response
export interface DeleteManyParentsResponse {
  success: boolean;
  message: string;
}

// gRPC service interface
export interface ParentGrpcService {
  CreateParent(data: CreateParentRequest): Observable<GrpcParentResponse>;
  GetAllParents(data: GetAllParentsRequest): Observable<GetAllParentsResponse>;
  GetParent(data: GetParentRequest): Observable<GrpcParentResponse>;
  UpdateParent(data: UpdateParentRequest): Observable<GrpcParentResponse>;
  DeleteParent(data: DeleteParentRequest): Observable<DeleteParentResponse>;
  CreateManyParents(
    data: CreateManyParentsRequest,
  ): Observable<CreateManyParentsResponse>;
  DeleteManyParents(
    data: DeleteManyParentsRequest,
  ): Observable<DeleteManyParentsResponse>;
}
