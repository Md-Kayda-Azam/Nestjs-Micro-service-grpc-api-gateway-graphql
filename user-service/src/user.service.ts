import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto, UpdateUserDto } from './types/UserTypes';
import { HashPassword } from './utils/VerificationPassword';
import { sendVerificationEmail } from './utils/VerificationEmail';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(data: CreateUserDto): Promise<any> {
    const existingUser = await this.userModel
      .findOne({ email: data.email })
      .exec();
    if (existingUser) {
      throw new RpcException({
        code: grpc.status.ALREADY_EXISTS,
        message: 'A user with this email already exists',
      });
    }

    // Hash the password with bcrypt
    const hashedPassword = await HashPassword(data.password);

    // Create the user with the hashed password
    const newUser = new this.userModel({
      ...data,
      password: hashedPassword, // Use the hashed password
      lastPasswordChanged: new Date(),
    });

    const savedUser = await newUser.save();

    // Send verification email
    sendVerificationEmail(savedUser.email, data.password, savedUser.firstName);

    const userObject = savedUser.toObject();
    return {
      id: userObject._id.toString(),
      ...userObject,
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
      verificationOtpExpires: userObject.verificationOtpExpires?.toISOString(),
      otpRequestedAt: userObject.otpRequestedAt?.toISOString(),
      otpBlockedUntil: userObject.otpBlockedUntil?.toISOString(),
      createdAt: userObject.createdAt?.toISOString(),
      updatedAt: userObject.updatedAt?.toISOString(),
    };
  }

  async findAllUsers(): Promise<any> {
    const users = await this.userModel.find({ isDeleted: false }).exec();
    return {
      users: users.map((user) => {
        const userObject = user.toObject();

        return {
          id: userObject._id.toString(),
          ...userObject,
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
          verificationOtpExpires:
            userObject.verificationOtpExpires?.toISOString(),
          otpRequestedAt: userObject.otpRequestedAt?.toISOString(),
          otpBlockedUntil: userObject.otpBlockedUntil?.toISOString(),
          createdAt: userObject.createdAt?.toISOString(),
          updatedAt: userObject.updatedAt?.toISOString(),
        };
      }),
    };
  }

  async findUser(id: string): Promise<any> {
    const user = await this.userModel.findById(id).exec();
    if (!user || user.isDeleted) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }

    const userObject = user.toObject();
    return {
      id: userObject._id.toString(),
      ...userObject,
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
      verificationOtpExpires: userObject.verificationOtpExpires?.toISOString(),
      otpRequestedAt: userObject.otpRequestedAt?.toISOString(),
      otpBlockedUntil: userObject.otpBlockedUntil?.toISOString(),
      createdAt: userObject.createdAt?.toISOString(),
      updatedAt: userObject.updatedAt?.toISOString(),
    };
  }

  async updateUser(data: UpdateUserDto): Promise<any> {
    const user = await this.userModel.findById(data.id).exec();
    if (!user || user.isDeleted) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'User not found',
      });
    }

    // Check for email uniqueness if email is being updated
    if (data.email && data.email !== user.email) {
      const existingUser = await this.userModel
        .findOne({ email: data.email })
        .exec();
      if (existingUser) {
        throw new RpcException({
          code: grpc.status.ALREADY_EXISTS,
          message: 'A user with this email already exists',
        });
      }
    }

    // Update only provided fields
    Object.keys(data).forEach((key) => {
      if (key !== 'id' && data[key] !== undefined) {
        user[key] = data[key];
      }
    });

    const updatedUser = await user.save();
    const userObject = updatedUser.toObject();
    return {
      id: userObject._id.toString(),
      ...userObject,
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
      verificationOtpExpires: userObject.verificationOtpExpires?.toISOString(),
      otpRequestedAt: userObject.otpRequestedAt?.toISOString(),
      otpBlockedUntil: userObject.otpBlockedUntil?.toISOString(),
      createdAt: userObject.createdAt?.toISOString(),
      updatedAt: userObject.updatedAt?.toISOString(),
    };
  }

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
