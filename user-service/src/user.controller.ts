import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { CreateUserDto, UpdateUserDto, VerifyUserDto } from './types/UserTypes';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: CreateUserDto) {
    try {
      return await this.userService.createUser(data);
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
      return await this.userService.findAllUsers();
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
      return await this.userService.findUser(data.id);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch user',
      });
    }
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(data: UpdateUserDto) {
    try {
      return await this.userService.updateUser(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update user',
      });
    }
  }

  @GrpcMethod('UserService', 'DeleteUser')
  async deleteUser(data: { id: string }) {
    try {
      await this.userService.deleteUser(data.id);
      return {}; // Return Empty message as per proto
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete user',
      });
    }
  }

  @GrpcMethod('UserService', 'VerifyUser') // নতুন মেথড যোগ করা হলো
  async verifyUser(data: VerifyUserDto) {
    try {
      return await this.userService.verifyUser(data);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to verify user',
      });
    }
  }
}
