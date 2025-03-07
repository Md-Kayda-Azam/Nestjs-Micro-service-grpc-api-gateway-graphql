import { Inject, Injectable, Req } from '@nestjs/common';
import {
  loginInput,
  resendVerificationInput,
  verifyAccountInput,
} from './dto/auth.input';
import { lastValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGrpcService, LogoutResponse } from './types/authTypes';
import { User } from 'src/shared/schema/user.entity';

@Injectable()
export class AuthService {
  private authGrpcService: AuthGrpcService;

  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {
    this.authGrpcService =
      this.client.getService<AuthGrpcService>('AuthService');
  }

  async verifyAccount(data: verifyAccountInput) {
    try {
      const response = await lastValueFrom(
        this.authGrpcService.verifyAccount(data),
      );

      return {
        _id: response.id, // Map id to _id
        ...response,
        devices: response.devices?.map((device) => ({
          deviceId: device.deviceId,
          ipAddress: device.ipAddress,
          userAgent: device.userAgent,
          location: device.location,
        })),
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create user');
    }
  }

  async resendVerification(data: resendVerificationInput) {
    try {
      const user = await lastValueFrom(
        this.authGrpcService.resendVerification(data),
      );
      return {
        message: `Verification link sent your email. Please check your email.`,
        code: 'SUCCESS',
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create user');
    }
  }

  async login(data: loginInput): Promise<User> {
    try {
      const response = await lastValueFrom(this.authGrpcService.login(data));

      return {
        _id: response.user.id,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
        role: response.user.role,
        school: response.user.school,
        isActive: response.user.isActive,
        lastActive: response.user.lastActive,
        mfaEnabled: response.user.mfaEnabled,
        createdAt: response.user.createdAt,
        updatedAt: response.user.updatedAt,
        isVerified: response.user.isVerified,
        isDeleted: response.user.isDeleted,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to login user');
    }
  }

  async getMe(token: string): Promise<User> {
    const response = await lastValueFrom(this.authGrpcService.getMe({ token }));
    return {
      _id: response.user.id,
      firstName: response.user.firstName,
      lastName: response.user.lastName,
      email: response.user.email,
      role: response.user.role,
      school: response.user.school,
      isActive: response.user.isActive,
      lastActive: response.user.lastActive,
      mfaEnabled: response.user.mfaEnabled,
      createdAt: response.user.createdAt,
      updatedAt: response.user.updatedAt,
      isVerified: response.user.isVerified,
      isDeleted: response.user.isDeleted,
    };
  }

  async logout(token: string): Promise<LogoutResponse> {
    try {
      const response = await lastValueFrom(
        this.authGrpcService.logout({ token }),
      );
      return response;
    } catch (error) {
      throw new Error(error.details || 'Failed to logout');
    }
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthInput: UpdateAuthInput) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
