// Device ইন্টারফেস (Auth স্কিমার সাথে মিল রেখে)
export interface Device {
  id: string;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Create User ডেটা
export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  school: string;
}

// Update User ডেটা (Auth স্কিমার সব ফিল্ড সহ)
export interface UpdateUserData {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  school?: string;
  isActive?: boolean;
  lastActive?: Date;
  mfaEnabled?: boolean;
  mfaSecret?: string;
  devices?: Device[];
  notifications?: string[];
  lastPasswordChanged?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  resetRequestedAt?: Date;
  resetRequestCount?: number;
  resetBlockedUntil?: Date;
  isVerified?: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  verificationRequestedAt?: Date;
  verificationRequestCount?: number;
  verificationBlockedUntil?: Date;
  isDeleted?: boolean;
  refreshToken?: string;
}

// User রেসপন্স (gRPC এর সাথে মিল রেখে)
export interface UserResponse {
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
  devices?: Device[] | undefined; // ঠিক আছে
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
export interface UserDevicesResponse {
  devices: Device[];
}

// UserGrpcService ইন্টারফেস
export interface UserGrpcService {
  CreateUser(data: CreateUserData): Promise<UserResponse>;
  FindAllUsers(data: {}): Promise<{ users: UserResponse[] }>;
  GetUserByEmail(data: { email: string }): Promise<UserResponse>;
  GetUserDevices(data: { id: string }): Promise<UserDevicesResponse>;
  UpdateUser(data: UpdateUserData): Promise<UserResponse>;
  DeleteUser(data: { id: string }): Promise<void>;
}
