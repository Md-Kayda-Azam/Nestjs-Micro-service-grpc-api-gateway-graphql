import { Observable } from 'rxjs';

// Device interface matching the proto message
interface Device {
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
}

// AuthResponse interface matching the proto message
interface AuthResponse {
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

// LoginResponse interface matching the proto message
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthResponse;
}

export interface GetMeResponse {
  user: AuthResponse;
}

// Request interfaces matching the proto messages
interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  school: string;
}

interface ResendVerificationRequest {
  email: string;
}

interface VerifyAccountRequest {
  token: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RequestPasswordResetRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

interface LogoutRequest {
  token: string;
}

interface GetMeRequest {
  token: string;
}

interface ResendVerifucationResponse {
  message: string;
  code: string;
}

// Empty interface for responses that return nothing
interface Empty {}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// AuthService interface matching the proto service definition
export interface AuthGrpcService {
  // Resend Verification
  resendVerification(
    data: ResendVerificationRequest,
  ): Observable<ResendVerifucationResponse>;

  // Verify Account
  verifyAccount(data: VerifyAccountRequest): Observable<AuthResponse>;

  // Login
  login(data: LoginRequest): Observable<LoginResponse>;

  // Login
  getMe(data: GetMeRequest): Observable<GetMeResponse>;

  // Refresh Token
  refreshToken(data: RefreshTokenRequest): Observable<LoginResponse>;

  // Request Password Reset
  requestPasswordReset(data: RequestPasswordResetRequest): Observable<Empty>;

  // Reset Password
  resetPassword(data: ResetPasswordRequest): Observable<AuthResponse>;

  // Logout
  logout(data: LogoutRequest): Observable<LogoutResponse>;
}
