import { useMutation } from "@tanstack/react-query";

import { login } from "../api/auth-api";
import { saveRefreshToken } from "../services/auth-storage";
import { router } from "expo-router";
import { useToast } from "@/hooks/useToast.hook";

export function useLogin() {
  const toast = useToast();

  return useMutation({
    mutationFn: login,

    onSuccess: async (response) => {
      const { accessToken, refreshToken, user } = response.data;

      await saveRefreshToken(refreshToken);

      toast.success("Welcome back!", `Logged in as ${user.email}`);

      router.replace("/chats");
    },

    onError: (error: any) => {
      const errorMessage = error.message || "An error occurred during login.";
      toast.error("Login Failed", errorMessage);
    },
  });
}
