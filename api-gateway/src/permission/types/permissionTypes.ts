import { Observable } from 'rxjs';

interface GrpcPermissionResponse {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface CreatePermissionRequest {
  name: string;
  description: string;
  isActive: boolean;
}

export interface PermissionGrpcService {
  // Create User
  CreateUser(data: CreatePermissionRequest): Observable<GrpcPermissionResponse>;
}
