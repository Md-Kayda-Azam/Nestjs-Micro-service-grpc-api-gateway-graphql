import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { RpcException } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import {
  CreateUserData,
  Device,
  UpdateUserData,
  UserResponse,
} from './types/UserTypes';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create User
   * @param data
   * @returns
   */
  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: CreateUserData): Promise<UserResponse> {
    try {
      const user = await this.userService.createUser(data);
      return user;
    } catch (error) {
      if (error instanceof RpcException) throw error;
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to create user',
      });
    }
  }

  /**
   * Get All Users
   * @param data
   * @returns
   */
  @GrpcMethod('UserService', 'FindAllUsers')
  async findAllUsers(data: {}): Promise<{ users: UserResponse[] }> {
    try {
      const users = await this.userService.findAllUsers();
      return users;
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch users',
      });
    }
  }

  /**
   * Get Single User
   * @param data
   * @returns
   */
  @GrpcMethod('UserService', 'GetUserByEmail')
  async getUserByEmail(data: { email: string }): Promise<UserResponse> {
    try {
      return await this.userService.getUserByEmail(data.email);
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch user by email',
      });
    }
  }

  @GrpcMethod('UserService', 'GetUserDevices')
  async getUserDevices(data: { id: string }): Promise<{ devices: Device[] }> {
    try {
      return await this.userService.getUserDevices(data.id);
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to fetch user devices',
      });
    }
  }

  /**
   * Update User
   * @param data
   * @returns
   */
  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(data: UpdateUserData): Promise<UserResponse> {
    try {
      return await this.userService.updateUser(data);
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to update user',
      });
    }
  }

  /**
   * Delete User
   * @param data
   * @returns
   */
  @GrpcMethod('UserService', 'DeleteUser')
  async deleteUser(data: { id: string }): Promise<void> {
    try {
      return await this.userService.deleteUser(data.id);
    } catch (error) {
      throw new RpcException({
        code: grpc.status.INTERNAL,
        message: 'Failed to delete user',
      });
    }
  }
}
