export interface PermissionResponse {
  id: string;
  name: string;
  description: string | undefined;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePermissionData {
  name: string;
  description?: string | null; // undefined বা null হতে পারে
  isActive?: boolean; // optional
}
