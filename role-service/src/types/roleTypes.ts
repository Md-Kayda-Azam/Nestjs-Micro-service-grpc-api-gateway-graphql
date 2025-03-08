export interface RoleResponse {
  id: string;
  name: string;
  permissionIds: string[];
  description: string | undefined;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleData {
  name: string;
  permissionIds?: string[];
  description?: string | null;
  isActive?: boolean;
}
