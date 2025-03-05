import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input'; // New DTO for update
import { UserGrpcService } from './types/UserTypes';

@Injectable()
export class UserService {
  private userGrpcService: UserGrpcService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {
    this.userGrpcService =
      this.client.getService<UserGrpcService>('UserService');
  }
  /**
   * Create User
   * @param data
   * @returns
   */
  async createUser(data: CreateUserInput): Promise<User> {
    try {
      const response = await lastValueFrom(
        this.userGrpcService.CreateUser(data),
      );

      return {
        _id: response.id, // Map id to _id
        ...response,
        devices: response.devices?.map((device) => ({
          _id: device.id,
          deviceId: device.deviceId,
          ipAddress: device.ipAddress,
          userAgent: device.userAgent,
          location: device.location,
          createdAt: device.createdAt,
          updatedAt: device.updatedAt,
        })),
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to create user');
    }
  }

  /**
   * Find All User
   * @returns
   */
  async findAllUsers(): Promise<User[]> {
    try {
      const result = await lastValueFrom(this.userGrpcService.FindAllUsers({}));
      console.log(result, 'user service');
      if (result?.users && Array.isArray(result.users)) {
        return result.users.map((response) => ({
          _id: response.id, // Map id to _id
          ...response,
          devices: response.devices?.map((device) => ({
            _id: device.id,
            deviceId: device.deviceId,
            ipAddress: device.ipAddress,
            userAgent: device.userAgent,
            location: device.location,
            createdAt: device.createdAt,
            updatedAt: device.updatedAt,
          })),
        }));
      }
      return [];
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch users');
    }
  }

  async findUser(email: string): Promise<User> {
    try {
      const response = await lastValueFrom(
        this.userGrpcService.GetUserByEmail({ email }),
      );

      if (!response || !response.id) {
        throw new Error('User not found id');
      }

      return {
        _id: response.id, // Map id to _id
        ...response,
        devices: response.devices?.map((device) => ({
          _id: device.id,
          deviceId: device.deviceId,
          ipAddress: device.ipAddress,
          userAgent: device.userAgent,
          location: device.location,
          createdAt: device.createdAt,
          updatedAt: device.updatedAt,
        })),
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch user');
    }
  }

  async updateUser(data: UpdateUserInput): Promise<User> {
    try {
      const response = await lastValueFrom(
        this.userGrpcService.UpdateUser(data),
      );
      return {
        _id: response.id, // Map id to _id
        ...response,
        devices: response.devices?.map((device) => ({
          _id: device.id,
          deviceId: device.deviceId,
          ipAddress: device.ipAddress,
          userAgent: device.userAgent,
          location: device.location,
          createdAt: device.createdAt,
          updatedAt: device.updatedAt,
        })),
      };
    } catch (error) {
      throw new Error(error.details || 'Failed to update user');
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await lastValueFrom(this.userGrpcService.DeleteUser({ id }));
    } catch (error) {
      throw new Error(error.details || 'Failed to delete user');
    }
  }
}
