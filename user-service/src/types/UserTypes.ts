export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
