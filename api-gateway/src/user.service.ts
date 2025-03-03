import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { User } from './entities/user.entity';

interface UsersResponse {
  users: User[];
}

interface UserGrpcService {
  CreateUser(data: { name: string; email: string }): Observable<User>;
  FindAllUsers(data: {}): Observable<UsersResponse>;
  FindUser(data: { id: string }): Observable<User>;
}

@Injectable()
export class UserService {
  private userGrpcService: UserGrpcService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {
    this.userGrpcService =
      this.client.getService<UserGrpcService>('UserService');
  }

  async createUser(data: { name: string; email: string }): Promise<User> {
    try {
      return await lastValueFrom(this.userGrpcService.CreateUser(data));
    } catch (error) {
      throw new Error(error.details || 'Failed to create user');
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      const result = await lastValueFrom(this.userGrpcService.FindAllUsers({}));
      return result?.users && Array.isArray(result.users) ? result.users : [];
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch users');
    }
  }

  async findUser(id: string): Promise<User> {
    try {
      return await lastValueFrom(this.userGrpcService.FindUser({ id }));
    } catch (error) {
      throw new Error(error.details || 'Failed to fetch user');
    }
  }
}
