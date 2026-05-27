// features/auth/hooks/useLogout.hook.ts
import { useMutation } from "@tanstack/react-query";
import { logout } from "../api/auth-api";
import { useAuth } from "@/providers/auth-context";
import { useToast } from "@/hooks/useToast.hook";
import { router } from "expo-router";

export function useLogout() {
  const { clearAuth } = useAuth();
  const toast = useToast();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await clearAuth();
      router.replace("/login");
    },
    onError: async (error: any) => {
      // clear locally even if server fails
      console.log("logout error ", error);
      await clearAuth();
      //   router.replace("/login");
      //   toast.error("Logout issue", error.message);
    },
  });
}
