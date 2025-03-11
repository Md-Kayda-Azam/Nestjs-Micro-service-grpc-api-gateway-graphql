import { Observable } from 'rxjs';

// Role response type
export interface GrpcRoleResponse {
  id: string;
  name: string;
  permissionIds: string[];
  // permissionIds: {
  //   id: string;
  //   name: string;
  //   description: string;
  //   isActive: string;
  //   createdAt?: string;
  //   updatedAt?: string;
  // };
  description: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Create role request
export interface CreateRoleRequest {
  name: string;
  permissionIds: string[];
  description: string;
}

// Get all roles request
export interface GetAllRolesRequest {
  limit: number;
  offset: number;
}

// Get all roles response
export interface GetAllRolesResponse {
  roles: GrpcRoleResponse[];
  total: number;
}

// Get role request
export interface GetRoleRequest {
  id: string;
}

// Update role request
export interface UpdateRoleRequest {
  id: string;
  name: string;
  permissionIds: string[];
  description: string;
  isActive: boolean;
}

// Delete role request
export interface DeleteRoleRequest {
  id: string;
}

// Delete role response
export interface DeleteRoleResponse {
  success: boolean;
  message: string;
}

// Create many roles request
export interface CreateManyRolesRequest {
  roles: CreateRoleRequest[];
}

// Create many roles response
export interface CreateManyRolesResponse {
  roles: GrpcRoleResponse[];
}

// Delete many roles request
export interface DeleteManyRolesRequest {
  ids: string[];
}

// Delete many roles response
export interface DeleteManyRolesResponse {
  success: boolean;
  message: string;
}

// gRPC service interface
export interface RoleGrpcService {
  CreateRole(data: CreateRoleRequest): Observable<GrpcRoleResponse>;
  GetAllRoles(data: GetAllRolesRequest): Observable<GetAllRolesResponse>;
  GetRole(data: GetRoleRequest): Observable<GrpcRoleResponse>;
  UpdateRole(data: UpdateRoleRequest): Observable<GrpcRoleResponse>;
  DeleteRole(data: DeleteRoleRequest): Observable<DeleteRoleResponse>;
  CreateManyRoles(
    data: CreateManyRolesRequest,
  ): Observable<CreateManyRolesResponse>;
  DeleteManyRoles(
    data: DeleteManyRolesRequest,
  ): Observable<DeleteManyRolesResponse>;
}
