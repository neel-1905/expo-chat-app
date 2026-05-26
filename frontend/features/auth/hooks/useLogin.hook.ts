import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/auth-store";
import { login } from "../api/auth-api";
import { saveRefreshToken } from "../services/auth-storage";
import { router } from "expo-router";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,

    onSuccess: async (response) => {
      const { accessToken, refreshToken, user } = response.data;

      await saveRefreshToken(refreshToken);

      setAuth({
        user,
        accessToken,
      });

      router.replace("/(protected)/(tabs)/chats");
    },
  });
}
