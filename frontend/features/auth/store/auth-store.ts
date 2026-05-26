import { create } from "zustand";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;

  accessToken: string | null;

  isAuthenticated: boolean;

  setAuth: (data: { user: User; accessToken: string }) => void;

  setAccessToken: (accessToken: string) => void;

  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  accessToken: null,

  isAuthenticated: false,

  setAuth: ({ user, accessToken }) =>
    set({
      user,
      accessToken,
      isAuthenticated: true,
    }),

  setAccessToken: (accessToken) =>
    set({
      accessToken,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    }),
}));
