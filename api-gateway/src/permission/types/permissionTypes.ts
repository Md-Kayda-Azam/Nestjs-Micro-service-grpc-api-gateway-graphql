import { Observable } from 'rxjs';

// Permission response type
export interface GrpcPermissionResponse {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Create permission request
export interface CreatePermissionRequest {
  name: string;
  description: string;
}

// Get all permissions request
export interface GetAllPermissionsRequest {
  limit: number;
  offset: number;
}

// Get all permissions response
export interface GetAllPermissionsResponse {
  permissions: GrpcPermissionResponse[];
  total: number;
}

// Get permission request
export interface GetPermissionRequest {
  id: string;
}

// Update permission request
export interface UpdatePermissionRequest {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

// Delete permission request
export interface DeletePermissionRequest {
  id: string;
}

// Delete permission response
export interface DeletePermissionResponse {
  success: boolean;
  message: string;
}

// Create many permissions request
export interface CreateManyPermissionsRequest {
  permissions: CreatePermissionRequest[];
}

// Create many permissions response
export interface CreateManyPermissionsResponse {
  permissions: GrpcPermissionResponse[];
}

// Delete many permissions request
export interface DeleteManyPermissionsRequest {
  ids: string[];
}

// Delete many permissions response
export interface DeleteManyPermissionsResponse {
  success: boolean;
  message: string;
}
export interface GrpcPermissionResponse {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
// একাধিক পারমিশন ফেচ করার রিকোয়েস্ট
export interface GetManyPermissionsRequest {
  ids: string[];
}

// একাধিক পারমিশনের রেসপন্স
export interface GetManyPermissionsResponse {
  permissions: GrpcPermissionResponse[];
  total: number;
}
// gRPC service interface
export interface PermissionGrpcService {
  CreatePermission(
    data: CreatePermissionRequest,
  ): Observable<GrpcPermissionResponse>;
  GetAllPermissions(
    data: GetAllPermissionsRequest,
  ): Observable<GetAllPermissionsResponse>;
  GetPermission(data: GetPermissionRequest): Observable<GrpcPermissionResponse>;
  UpdatePermission(
    data: UpdatePermissionRequest,
  ): Observable<GrpcPermissionResponse>;
  DeletePermission(
    data: DeletePermissionRequest,
  ): Observable<DeletePermissionResponse>;
  CreateManyPermissions(
    data: CreateManyPermissionsRequest,
  ): Observable<CreateManyPermissionsResponse>;
  DeleteManyPermissions(
    data: DeleteManyPermissionsRequest,
  ): Observable<DeleteManyPermissionsResponse>;
  GetManyPermissions(
    data: GetManyPermissionsRequest,
  ): Observable<GetManyPermissionsResponse>;
}
