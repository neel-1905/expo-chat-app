export type User = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginData = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenPayload = {
  refreshToken: string;
};

export type RefreshTokenData = {
  accessToken: string;
};

export type MeData = User;
