import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import {
  LoginData,
  LogoutData,
  RefreshTokenData,
  RequestPasswordResetData,
  ResendVerificationData,
  ResetPasswordData,
  VerifyAccountData,
} from './types/authTypes';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  // Verify Account API
  @GrpcMethod('AuthService', 'VerifyAccount')
  async verifyUser(data: VerifyAccountData) {
    try {
      const user = await this.authService.verifyAccount(data);
      return user;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to verify user',
      });
    }
  }

  // Resend Verification API
  @GrpcMethod('AuthService', 'ResendVerification')
  async resendVerification(data: ResendVerificationData) {
    try {
      const result = await this.authService.resendVerification(data);
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to resend verification',
      });
    }
  }

  // Login API
  @GrpcMethod('AuthService', 'Login')
  async login(data: LoginData) {
    try {
      const result = await this.authService.login(data);
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to login',
      });
    }
  }

  // Refresh Token API
  @GrpcMethod('AuthService', 'RefreshToken')
  async refreshToken(data: RefreshTokenData) {
    try {
      const result = await this.authService.refreshToken(data);
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to refresh token',
      });
    }
  }

  // Request Password Reset API
  @GrpcMethod('AuthService', 'RequestPasswordReset')
  async requestPasswordReset(data: RequestPasswordResetData) {
    try {
      const result = await this.authService.requestPasswordReset(data);
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to request password reset',
      });
    }
  }

  // Reset Password API
  @GrpcMethod('AuthService', 'ResetPassword')
  async resetPassword(data: ResetPasswordData) {
    try {
      const result = await this.authService.resetPassword(data);
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to reset password',
      });
    }
  }

  // Logout API
  @GrpcMethod('AuthService', 'Logout')
  async logout(data: LogoutData) {
    try {
      const result = await this.authService.logout(data);
      return result;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to logout',
      });
    }
  }
}
