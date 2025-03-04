import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto, UpdateUserDto, VerifyUserDto } from './types/UserTypes';
import { HashPassword } from './utils/VerificationPassword';
import { sendVerificationEmail } from './utils/VerificationEmail';
import { randomBytes } from 'crypto';

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
    // const hashedPassword = await HashPassword(data.password);

    // Generate a secure verification token
    const verificationToken = randomBytes(16).toString('hex');

    // Create the user with the hashed password
    const newUser = new this.userModel({
      ...data,
      verificationToken,
      isVerified: false, // Initially unverified
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
    // frontend ar jonno link ata
    // const verificationLink = `http://your-site.com/verify?token=${verificationToken}`;

    // backend test ar jonno link ata
    const verificationLink = `http://localhost:3000/graphql`;
    try {
      // Directly call sendVerificationEmail without BullMQ
      await sendVerificationEmail(
        savedUser.email,
        savedUser.firstName,
        verificationLink,
      );
      console.log(`Verification email sent to ${savedUser.email}`);
    } catch (error) {
      // If email fails, throw error and rollback user creation if needed
      await this.userModel.deleteOne({ _id: savedUser._id }).exec();
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to send verification email: ' + error.message,
      });
    }

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

  // Method to verify token and allow password setup
  async verifyUser(data: VerifyUserDto): Promise<any> {
    const user = await this.userModel
      .findOne({ verificationToken: data.token })
      .exec();
    if (!user) {
      throw new RpcException({
        code: grpc.status.NOT_FOUND,
        message: 'Invalid or expired verification token',
      });
    }

    const hashedPassword = await HashPassword(data.password);
    user.password = hashedPassword;
    user.isVerified = true;
    user.verificationToken = undefined; // Clear token after use
    await user.save();

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
