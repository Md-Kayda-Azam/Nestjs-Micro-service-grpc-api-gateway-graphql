import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { User, UserDocument } from './schema/user.schema';
import {
  CreateUserData,
  UpdateUserData,
  UserResponse,
  Device,
} from './types/UserTypes';
import { sendVerificationEmail } from './utils/VerificationEmail';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Create User
   * @param data
   * @returns
   */
  async createUser(data: CreateUserData): Promise<UserResponse> {
    const existingUser = await this.userModel
      .findOne({ email: data.email })
      .exec();
    if (existingUser) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'A user with this email already exists',
      });
    }

    const verificationToken = randomBytes(16).toString('hex');
    const verificationTokenExpires = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000,
    );

    const newUser = new this.userModel({
      ...data,
      verificationToken,
      verificationTokenExpires,
      isVerified: false,
    });

    let savedUser;
    try {
      savedUser = await newUser.save();
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to save user: ' + error.message,
      });
    }

    const verificationLink = `http://localhost:3000/graphql`;
    try {
      await sendVerificationEmail(
        savedUser.email,
        savedUser.firstName,
        verificationLink,
      );
      console.log(`Verification email sent to ${savedUser.email}`);
    } catch (error) {
      await this.userModel.deleteOne({ _id: savedUser._id }).exec();
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to send verification email: ' + error.message,
      });
    }

    const userObject = savedUser.toObject();
    return {
      id: userObject._id.toString(),
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      email: userObject.email,
      role: userObject.role,
      school: userObject.school,
      isActive: userObject.isActive,
      lastActive: userObject.lastActive?.toISOString(),
      mfaEnabled: userObject.mfaEnabled,
      mfaSecret: userObject.mfaSecret,
      devices: userObject.devices?.map((device) => ({
        id: device._id.toString(),
        deviceId: device.deviceId,
        ipAddress: device.ipAddress,
        userAgent: device.userAgent,
        location: device.location,
        createdAt: device.createdAt?.toISOString(),
        updatedAt: device.updatedAt?.toISOString(),
      })),
      notifications: userObject.notifications,
      lastPasswordChanged: userObject.lastPasswordChanged?.toISOString(),
      resetPasswordToken: userObject.resetPasswordToken,
      resetPasswordExpires: userObject.resetPasswordExpires?.toISOString(),
      resetRequestedAt: userObject.resetRequestedAt?.toISOString(),
      resetRequestCount: userObject.resetRequestCount,
      resetBlockedUntil: userObject.resetBlockedUntil?.toISOString(),
      isVerified: userObject.isVerified,
      verificationToken: userObject.verificationToken,
      verificationTokenExpires:
        userObject.verificationTokenExpires?.toISOString(),
      verificationRequestedAt:
        userObject.verificationRequestedAt?.toISOString(),
      verificationRequestCount: userObject.verificationRequestCount,
      verificationBlockedUntil:
        userObject.verificationBlockedUntil?.toISOString(),
      isDeleted: userObject.isDeleted,
      refreshToken: userObject.refreshToken,
      createdAt: userObject.createdAt?.toISOString(),
      updatedAt: userObject.updatedAt?.toISOString(),
    };
  }

  /**
   * Find All Users
   * @returns
   */
  async findAllUsers(): Promise<{ users: UserResponse[] }> {
    const users = await this.userModel.find({ isDeleted: false }).exec();
    return {
      users: users.map((user) => {
        const userObject = user.toObject(); // Mongoose Document থেকে প্লেইন অবজেক্ট
        return {
          id: userObject._id.toString(),
          firstName: userObject.firstName,
          lastName: userObject.lastName,
          email: userObject.email,
          role: userObject.role,
          school: userObject.school,
          isActive: userObject.isActive,
          lastActive: userObject.lastActive?.toISOString(),
          mfaEnabled: userObject.mfaEnabled,
          mfaSecret: userObject.mfaSecret,
          devices: userObject.devices?.map((device) => ({
            id: device._id.toString(),
            deviceId: device.deviceId,
            ipAddress: device.ipAddress,
            userAgent: device.userAgent,
            location: device.location,
            createdAt: device.createdAt?.toISOString(),
            updatedAt: device.updatedAt?.toISOString(),
          })),
          notifications: userObject.notifications,
          lastPasswordChanged: userObject.lastPasswordChanged?.toISOString(),
          resetPasswordToken: userObject.resetPasswordToken,
          resetPasswordExpires: userObject.resetPasswordExpires?.toISOString(),
          resetRequestedAt: userObject.resetRequestedAt?.toISOString(),
          resetRequestCount: userObject.resetRequestCount,
          resetBlockedUntil: userObject.resetBlockedUntil?.toISOString(),
          isVerified: userObject.isVerified,
          verificationToken: userObject.verificationToken,
          verificationTokenExpires:
            userObject.verificationTokenExpires?.toISOString(),
          verificationRequestedAt:
            userObject.verificationRequestedAt?.toISOString(),
          verificationRequestCount: userObject.verificationRequestCount,
          verificationBlockedUntil:
            userObject.verificationBlockedUntil?.toISOString(),
          isDeleted: userObject.isDeleted,
          refreshToken: userObject.refreshToken,
          createdAt: userObject.createdAt?.toISOString(),
          updatedAt: userObject.updatedAt?.toISOString(),
        } as UserResponse; // টাইপ কাস্টিং
      }),
    };
  }

  /**
   * Get Single User
   * @param email
   * @returns
   */
  async getUserByEmail(email: string): Promise<UserResponse> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user || user.isDeleted) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }
    const userObject = user.toObject();
    return {
      id: userObject._id.toString(),
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      email: userObject.email,
      role: userObject.role,
      school: userObject.school,
      isActive: userObject.isActive,
      lastActive: userObject.lastActive?.toISOString(),
      mfaEnabled: userObject.mfaEnabled,
      mfaSecret: userObject.mfaSecret,
      devices: userObject.devices?.map((device) => ({
        id: device._id.toString(),
        deviceId: device.deviceId,
        ipAddress: device.ipAddress,
        userAgent: device.userAgent,
        location: device.location,
        createdAt: device.createdAt?.toISOString(),
        updatedAt: device.updatedAt?.toISOString(),
      })),
      notifications: userObject.notifications,
      lastPasswordChanged: userObject.lastPasswordChanged?.toISOString(),
      resetPasswordToken: userObject.resetPasswordToken,
      resetPasswordExpires: userObject.resetPasswordExpires?.toISOString(),
      resetRequestedAt: userObject.resetRequestedAt?.toISOString(),
      resetRequestCount: userObject.resetRequestCount,
      resetBlockedUntil: userObject.resetBlockedUntil?.toISOString(),
      isVerified: userObject.isVerified,
      verificationToken: userObject.verificationToken,
      verificationTokenExpires:
        userObject.verificationTokenExpires?.toISOString(),
      verificationRequestedAt:
        userObject.verificationRequestedAt?.toISOString(),
      verificationRequestCount: userObject.verificationRequestCount,
      verificationBlockedUntil:
        userObject.verificationBlockedUntil?.toISOString(),
      isDeleted: userObject.isDeleted,
      refreshToken: userObject.refreshToken,
      createdAt: userObject.createdAt?.toISOString(),
      updatedAt: userObject.updatedAt?.toISOString(),
    } as UserResponse; // টাইপ কাস্টিং;
  }

  async getUserDevices(id: string): Promise<{ devices: Device[] }> {
    const user = await this.userModel.findById(id).exec();
    if (!user || user.isDeleted) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }
    const userObject = user.toObject();
    return {
      devices:
        userObject.devices?.map((device) => ({
          id: device._id.toString(),
          deviceId: device.deviceId,

          ipAddress: device.ipAddress,
          userAgent: device.userAgent,
          location: device.location,
          createdAt: device.createdAt?.toISOString(),
          updatedAt: device.updatedAt?.toISOString(),
        })) || [],
    };
  }

  /**
   * Update User
   * @param data
   * @returns
   */
  async updateUser(data: UpdateUserData): Promise<UserResponse> {
    const user = await this.userModel.findById(data.id).exec();
    if (!user || user.isDeleted) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }

    Object.assign(user, data);
    const updatedUser = await user.save();
    const userObject = updatedUser.toObject();
    return {
      id: userObject._id.toString(),
      firstName: userObject.firstName,
      lastName: userObject.lastName,
      email: userObject.email,
      role: userObject.role,
      school: userObject.school,
      isActive: userObject.isActive,
      lastActive: userObject.lastActive?.toISOString(),
      mfaEnabled: userObject.mfaEnabled,
      mfaSecret: userObject.mfaSecret,
      devices: userObject.devices?.map((device) => ({
        id: device._id.toString(),
        deviceId: device.deviceId,
        ipAddress: device.ipAddress,
        userAgent: device.userAgent,
        location: device.location,
        createdAt: device.createdAt?.toISOString(),
        updatedAt: device.updatedAt?.toISOString(),
      })),
      notifications: userObject.notifications,
      lastPasswordChanged: userObject.lastPasswordChanged?.toISOString(),
      resetPasswordToken: userObject.resetPasswordToken,
      resetPasswordExpires: userObject.resetPasswordExpires?.toISOString(),
      resetRequestedAt: userObject.resetRequestedAt?.toISOString(),
      resetRequestCount: userObject.resetRequestCount,
      resetBlockedUntil: userObject.resetBlockedUntil?.toISOString(),
      isVerified: userObject.isVerified,
      verificationToken: userObject.verificationToken,
      verificationTokenExpires:
        userObject.verificationTokenExpires?.toISOString(),
      verificationRequestedAt:
        userObject.verificationRequestedAt?.toISOString(),
      verificationRequestCount: userObject.verificationRequestCount,
      verificationBlockedUntil:
        userObject.verificationBlockedUntil?.toISOString(),
      isDeleted: userObject.isDeleted,
      refreshToken: userObject.refreshToken,
      createdAt: userObject.createdAt?.toISOString(),
      updatedAt: userObject.updatedAt?.toISOString(),
    } as UserResponse;
  }

  /**
   * Delete user
   * @param id
   */
  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findById(id).exec();
    if (!user || user.isDeleted) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }
    user.isDeleted = true;
    await user.save();
  }
}
