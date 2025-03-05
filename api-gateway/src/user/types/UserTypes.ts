import { Observable } from 'rxjs';

// Device ইন্টারফেস (Auth স্কিমার সাথে মিল রেখে)
interface Device {
  id: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

// gRPC থেকে আসা ইউজার রেসপন্স (Auth স্কিমার সব ফিল্ড সহ)
interface GrpcUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  school: string;
  isActive: boolean;
  lastActive?: string;
  mfaEnabled: boolean;
  mfaSecret?: string;
  devices?: Device[];
  notifications?: string[];
  lastPasswordChanged?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
  resetRequestedAt?: string;
  resetRequestCount?: number;
  resetBlockedUntil?: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: string;
  verificationRequestedAt?: string;
  verificationRequestCount?: number;
  verificationBlockedUntil?: string;
  isDeleted: boolean;
  refreshToken?: string;
  createdAt?: string;
  updatedAt?: string;
}

// User Devices রেসপন্স
interface UserDevicesResponse {
  devices: Device[];
}

// gRPC সার্ভিস ইন্টারফেস
export interface UserGrpcService {
  // Create User
  CreateUser(data: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    school: string;
  }): Observable<GrpcUserResponse>;

  // Get All Users
  FindAllUsers(data: {}): Observable<{ users: GrpcUserResponse[] }>;

  // Get User by Email
  GetUserByEmail(data: { email: string }): Observable<GrpcUserResponse>;

  // Get User Devices by ID
  GetUserDevices(data: { id: string }): Observable<UserDevicesResponse>;

  // Update User
  UpdateUser(data: {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    school?: string;
    isActive?: boolean;
    lastActive?: string;
    mfaEnabled?: boolean;
    mfaSecret?: string;
    devices?: Device[];
    notifications?: string[];
    lastPasswordChanged?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: string;
    resetRequestedAt?: string;
    resetRequestCount?: number;
    resetBlockedUntil?: string;
    isVerified?: boolean;
    verificationToken?: string;
    verificationTokenExpires?: string;
    verificationRequestedAt?: string;
    verificationRequestCount?: number;
    verificationBlockedUntil?: string;
    isDeleted?: boolean;
    refreshToken?: string;
  }): Observable<GrpcUserResponse>;

  // Delete User
  DeleteUser(data: { id: string }): Observable<void>;
}
