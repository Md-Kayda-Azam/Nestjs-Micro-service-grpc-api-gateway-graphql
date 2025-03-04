import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

interface Device {
  id: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UsersResponse {
  users: User[];
}

interface GrpcUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  school: string;
  isActive: boolean;
  mfaEnabled: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  devices?: Device[]; // Added Device array
  createdAt?: string;
  updatedAt?: string;
}

export interface UserGrpcService {
  CreateUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    school: string;
  }): Observable<GrpcUserResponse>;
  FindAllUsers(data: {}): Observable<{ users: GrpcUserResponse[] }>;
  FindUser(data: { id: string }): Observable<GrpcUserResponse>;
  UpdateUser(data: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    school?: string;
    isActive?: boolean;
    mfaEnabled?: boolean;
    isVerified?: boolean;
    refreshToken?: string;
  }): Observable<GrpcUserResponse>;
  DeleteUser(data: { id: string }): Observable<void>; // Still returns void as per proto
}
