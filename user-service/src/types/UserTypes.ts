export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  school: string;
}

export interface UpdateUserDto {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
  school?: string;
  isActive?: boolean;
  mfaEnabled?: boolean;
  isVerified?: boolean;
  refreshToken?: string;
}

export interface VerifyUserDto {
  token: string;
  password: string;
}

export interface UserGrpcService {
  CreateUser(data: CreateUserDto): Promise<any>;
  FindAllUsers(data: {}): Promise<any>;
  FindUser(data: { id: string }): Promise<any>;
  UpdateUser(data: UpdateUserDto): Promise<any>;
  DeleteUser(data: { id: string }): Promise<void>;
  VerifyUser(data: VerifyUserDto): Promise<void>; // নতুন মেথড
}
