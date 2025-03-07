import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, User, UserDocument } from './schema/user.schema';
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
  sendSecurityAlertEmail,
  sendVerificationEmail,
} from './utils/VerificationEmail';
import { IpAddressGet } from './api/IpAddressGet';
import { generateDeviceId } from './utils/generateDeviceId';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private authModel: Model<UserDocument>) {}

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
        deviceId: device.deviceId,
        ipAddress: device.ipAddress,
        userAgent: device.userAgent,
        location: device.location,
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
        message: 'Invalid email address, please vaild email try again!',
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

    // if (user.verificationTokenExpires && user.verificationTokenExpires > now) {
    //   throw new RpcException({
    //     code: grpc.status.FAILED_PRECONDITION,
    //     message:
    //       'Your previous verification link is still valid. Please check your email.',
    //   });
    // }

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
        message: 'Email not found. Please provide a registered email address.',
      });
    }

    if (!user.isVerified) {
      throw new RpcException({
        code: grpc.status.FAILED_PRECONDITION,
        message: 'Account not verified. Verify your email to proceed.',
      });
    }

    if (
      !user.password ||
      !(await bcrypt.compare(data.password, user.password))
    ) {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Invalid credentials. Check your email and password.',
      });
    }

    const userAgent = data.userAgent;
    const ipData = await IpAddressGet(); // ধরে নিচ্ছি এটা একটা ফাংশন যা IP ডাটা রিটার্ন করে
    const ipAddress = ipData.ip;
    const location = `${ipData.city}, ${ipData.country}`;
    const deviceId = generateDeviceId(ipAddress, 'userAgent', 'en-US');

    // 3. ডিভাইস ম্যানেজমেন্ট
    user.devices = user.devices || []; // নিশ্চিত করা যে devices অ্যারে আছে
    const existingDevice = user.devices.find(
      (d: Device) => d.deviceId === deviceId,
    );

    if (!existingDevice) {
      const newDevice: Device = {
        deviceId,
        ipAddress,
        userAgent,
        location,
      };
      user.devices.push(newDevice);

      // সিকিউরিটি অ্যালার্ট (শুধু যদি এটা প্রথম ডিভাইস না হয়)
      if (user.devices.length > 1) {
        await sendSecurityAlertEmail(
          user.email,
          location,
          ipAddress,
          userAgent,
        );
      }
    } else {
      // বিদ্যমান ডিভাইস আপডেট
      existingDevice.ipAddress = ipAddress;
      existingDevice.userAgent = userAgent;
      existingDevice.location = location;
    }

    // 4. JWT টোকেন জেনারেট
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      deviceId,
      ipAddress,
    };
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'Q7k9P2mX4vR8tW5wY3nF6jH0eD9cA9bB',
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || 'Q7k9P2mX4vR8tW5wY3nF6jH0eD9cA9bB',
      {
        expiresIn: '7d',
      },
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

  async getMe(token: string): Promise<{ user: any }> {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || '', {
        algorithms: ['HS256'],
      });
    } catch {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Invalid or expired token',
      });
    }

    const user = await this.authModel.findById(decoded.sub).exec();
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        school: user.school,
        isActive: user.isActive,
        lastActive: user.lastActive?.toISOString() || '',
        mfaEnabled: user.mfaEnabled,
        isVerified: user.isVerified,
        isDeleted: user.isDeleted,
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
      jwt.verify(data.refreshToken, process.env.JWT_REFRESH_SECRET || '');
    } catch (error) {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Refresh token is expired or invalid',
      });
    }

    const newAccessToken = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET || 'default_refresh_secret',
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
  async logout(token: string): Promise<{ success: boolean; message: string }> {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    } catch {
      throw new RpcException({
        code: grpc.status.UNAUTHENTICATED,
        message: 'Invalid or expired token',
      });
    }

    const user = await this.authModel.findById(decoded.sub).exec();
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }

    user.refreshToken = null;
    await user.save();

    return {
      success: true,
      message: 'Successfully logged out',
    };
  }
}
