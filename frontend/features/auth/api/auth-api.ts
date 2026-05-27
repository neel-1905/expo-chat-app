import { api } from "@/lib/axios";

import {
  LoginPayload,
  LoginData,
  RefreshTokenData,
  MeData,
} from "../types/auth.types";
import { ApiResponse } from "@/types/api.types";

export async function login(payload: LoginPayload) {
  const response = await api.post<ApiResponse<LoginData>>(
    "/auth/login",
    payload,
  );

  return response.data;
}

export async function refreshToken(refreshToken: string) {
  const response = await api.post<ApiResponse<RefreshTokenData>>(
    "/auth/refresh",
    {
      refreshToken,
    },
  );
  return response.data;
}

export async function me() {
  const response = await api.get<ApiResponse<MeData>>("/auth/me", {});

  return response.data;
}
