import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import * as grpc from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { HashPassword } from './utils/VerificationPassword'; // ধরে নিচ্ছি এটা আছে
import { randomBytes } from 'crypto';
import { checkRateLimit } from './helper/checkRateLimit';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {
  LoginData,
  LogoutData,
  RefreshTokenData,
  RequestPasswordResetData,
  ResetPasswordData,
  VerifyAccountData,
} from './types/authTypes';
import {
  sendResetEmail,
  sendVerificationEmail,
} from './utils/VerificationEmail';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // .env থেকে নেওয়া উচিত
  private readonly REFRESH_SECRET =
    process.env.REFRESH_SECRET || 'your-refresh-secret'; // .env থেকে নেওয়া উচিত

  getHello(): string {
    return 'Hello World!';
  }

  // Verify User
  async verifyAccount(data: VerifyAccountData): Promise<any> {
    const user = await this.authModel
      .findOne({
        verificationToken: data.token,
      })
      .exec();

    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Invalid verification token',
      });
    }

    if (
      !user.verificationTokenExpires ||
      user.verificationTokenExpires < new Date()
    ) {
      throw new RpcException({
        code: grpc.status.DEADLINE_EXCEEDED,
        message: 'Verification token has expired. Please request a new one.',
      });
    }

    if (user.isVerified) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'User is already verified',
      });
    }

    const hashedPassword = await HashPassword(data.password);
    user.password = hashedPassword;
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    user.lastPasswordChanged = new Date();

    await user.save();

    const userObject = user.toObject();
    const { _id, ...restUserObject } = userObject;
    return {
      id: userObject._id.toString(),
      ...restUserObject,
      lastActive: userObject.lastActive?.toISOString(),
      devices: userObject.devices?.map((device) => ({
        id: device._id.toString(),
        deviceId: device.deviceId,
        ipAddress: device.ipAddress,
        userAgent: device.userAgent,
        location: device.location,
        createdAt: device.createdAt?.toISOString(),
        updatedAt: device.updatedAt?.toISOString(),
      })),
      lastPasswordChanged: userObject.lastPasswordChanged?.toISOString(),
      resetPasswordExpires: userObject.resetPasswordExpires?.toISOString(),
      verificationTokenExpires:
        userObject.verificationTokenExpires?.toISOString(),
      verificationRequestedAt:
        userObject.verificationRequestedAt?.toISOString(),
      verificationBlockedUntil:
        userObject.verificationBlockedUntil?.toISOString(),
      createdAt: userObject.createdAt?.toISOString(),
      updatedAt: userObject.updatedAt?.toISOString(),
    };
  }

  // Resend Verification
  async resendVerification(data: { email: string }): Promise<any> {
    const user = await this.authModel.findOne({ email: data.email }).exec();
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }

    if (user.isVerified) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'User is already verified',
      });
    }

    const now = new Date();
    await checkRateLimit(user, 'verification');

    if (user.verificationTokenExpires && user.verificationTokenExpires > now) {
      throw new RpcException({
        code: grpc.status.FAILED_PRECONDITION,
        message:
          'Your previous verification link is still valid. Please check your email.',
      });
    }

    const newVerificationToken = randomBytes(16).toString('hex');
    user.verificationToken = newVerificationToken;
    user.verificationTokenExpires = new Date(
      now.getTime() + 7 * 24 * 60 * 60 * 1000,
    );
    user.verificationRequestedAt = now;
    user.verificationRequestCount = (user.verificationRequestCount ?? 0) + 1;

    try {
      await user.save();
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message:
          'Failed to update user with new verification token: ' + error.message,
      });
    }

    const verificationLink = `http://localhost:3000/verify?token=${newVerificationToken}`;
    try {
      await sendVerificationEmail(user.email, user.firstName, verificationLink);
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to send verification email: ' + error.message,
      });
    }

    return { message: 'Verification email sent successfully' };
  }

  // Login
  async login(data: LoginData): Promise<any> {
    const user = await this.authModel.findOne({ email: data.email }).exec();
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Invalid email or password',
      });
    }

    if (!user.isVerified) {
      throw new RpcException({
        code: grpc.status.FAILED_PRECONDITION,
        message: 'Account not verified. Please verify your email.',
      });
    }

    if (
      !user.password ||
      !(await bcrypt.compare(data.password, user.password))
    ) {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Invalid email or password',
      });
    }

    const accessToken = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      this.JWT_SECRET,
      { expiresIn: '15m' }, // Access token ১৫ মিনিট মেয়াদ
    );

    const refreshToken = jwt.sign(
      { id: user._id.toString(), email: user.email },
      this.REFRESH_SECRET,
      { expiresIn: '7d' }, // Refresh token ৭ দিন মেয়াদ
    );

    user.refreshToken = refreshToken;
    user.lastActive = new Date();
    await user.save();

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  // Refresh Token
  async refreshToken(data: RefreshTokenData): Promise<any> {
    const user = await this.authModel
      .findOne({ refreshToken: data.refreshToken })
      .exec();
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Invalid refresh token',
      });
    }

    try {
      jwt.verify(data.refreshToken, this.REFRESH_SECRET);
    } catch (error) {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Refresh token is expired or invalid',
      });
    }

    const newAccessToken = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      this.JWT_SECRET,
      { expiresIn: '15m' }, // নতুন Access token ১৫ মিনিট মেয়াদ
    );

    return {
      accessToken: newAccessToken,
      refreshToken: data.refreshToken, // পুরোনো রিফ্রেশ টোকেনই ফেরত দেওয়া হচ্ছে
    };
  }

  // Request Password Reset
  async requestPasswordReset(data: RequestPasswordResetData): Promise<any> {
    const user = await this.authModel.findOne({ email: data.email }).exec();
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }

    if (!user.isVerified) {
      throw new RpcException({
        code: grpc.status.FAILED_PRECONDITION,
        message: 'Account not verified. Please verify your email first.',
      });
    }

    const now = new Date();
    await checkRateLimit(user, 'reset');

    const resetToken = randomBytes(16).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(now.getTime() + 24 * 60 * 60 * 1000); // ২৪ ঘণ্টা মেয়াদ
    user.resetRequestedAt = now;
    user.resetRequestCount = (user.resetRequestCount ?? 0) + 1;

    try {
      await user.save();
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to save reset token: ' + error.message,
      });
    }

    const resetLink = `http://localhost:3000/reset?token=${resetToken}`;
    try {
      await sendResetEmail(user.email, user.firstName, resetLink);
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to send reset email: ' + error.message,
      });
    }

    return { message: 'Password reset link sent successfully' };
  }

  // Reset Password
  async resetPassword(data: ResetPasswordData): Promise<any> {
    const user = await this.authModel
      .findOne({
        resetPasswordToken: data.token,
      })
      .exec();

    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Invalid reset token',
      });
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new RpcException({
        code: grpc.status.DEADLINE_EXCEEDED,
        message: 'Reset token has expired. Please request a new one.',
      });
    }

    const hashedPassword = await HashPassword(data.newPassword);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // টোকেন মুছে ফেলা
    user.resetPasswordExpires = undefined;
    user.lastPasswordChanged = new Date();

    try {
      await user.save();
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to reset password: ' + error.message,
      });
    }

    return { message: 'Password reset successfully' };
  }

  // Logout
  async logout(data: LogoutData): Promise<any> {
    const user = await this.authModel
      .findOne({ refreshToken: data.refreshToken })
      .exec();
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Invalid refresh token',
      });
    }

    try {
      jwt.verify(
        data.refreshToken,
        process.env.REFRESH_SECRET || 'your-refresh-secret',
      );
    } catch (error) {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Refresh token is invalid or expired',
      });
    }

    user.refreshToken = undefined;
    await user.save();
    return { message: 'Logged out successfully' };
  }
}
