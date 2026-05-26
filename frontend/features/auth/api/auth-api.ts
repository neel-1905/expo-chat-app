import { api } from "@/lib/axios";

import { LoginPayload, LoginData } from "../types/auth.types";
import { ApiResponse } from "@/types/api.types";

export async function login(payload: LoginPayload) {
  const response = await api.post<ApiResponse<LoginData>>(
    "/auth/login",
    payload,
  );

  return response.data;
}
