export interface VerifyAccountData {
  token: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
  userAgent: string;
}

export interface ResendVerificationData {
  email: string;
}

export interface RefreshTokenData {
  refreshToken: string;
}

export interface RequestPasswordResetData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface LogoutData {
  refreshToken: string;
}

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    school: string;
  };
};
