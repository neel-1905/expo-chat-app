export type User = {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
