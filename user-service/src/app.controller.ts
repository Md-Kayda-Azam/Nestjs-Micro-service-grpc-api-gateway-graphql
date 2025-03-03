import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { User, UserDocument } from './schema/user.schema';

@Controller()
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: { name: string; email: string }) {
    try {
      // ইমেইল ইতিমধ্যে আছে কিনা চেক করা
      const existingUser = await this.userModel
        .findOne({ email: data.email })
        .exec();
      if (existingUser) {
        throw new RpcException({
          code: grpc.status.ALREADY_EXISTS,
          message: 'A user with this email already exists',
        });
      }

      const newUser = new this.userModel(data);
      const savedUser = await newUser.save();
      return {
        id: savedUser._id.toString(),
        name: savedUser.name,
        email: savedUser.email,
      };
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create user',
      });
    }
  }

  @GrpcMethod('UserService', 'FindAllUsers')
  async findAllUsers(data: {}) {
    try {
      const users = await this.userModel.find().exec();
      return {
        users: users.map((user) => ({
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        })),
      };
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch users',
      });
    }
  }

  @GrpcMethod('UserService', 'FindUser')
  async findUser(data: { id: string }) {
    try {
      const user = await this.userModel.findById(data.id).exec();
      if (!user) {
        throw new RpcException({
          code: grpc.status.NOT_FOUND,
          message: 'User not found',
        });
      }
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch user',
      });
    }
  }
}
