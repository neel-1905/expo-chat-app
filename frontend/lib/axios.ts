import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  clearTokens,
} from "@/features/auth/services/auth-storage";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach access token to every request
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.data?.success === false) {
      return Promise.reject(
        new Error(response.data.message ?? "Something went wrong."),
      );
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // if 401 and not already retried, refresh and retry
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/")
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();
        const response = await api.post("/auth/refresh", { refreshToken });
        const { accessToken: newAccessToken } = response.data;

        await saveAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest); // retry original request
      } catch {
        await clearTokens();
        return Promise.reject(
          new Error("Session expired, please login again."),
        );
      }
    }

    const message = error.response?.data?.message ?? "Something went wrong.";
    return Promise.reject(new Error(message));
  },
);
