import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth-api";
import { useToast } from "@/hooks/useToast.hook";
import { router } from "expo-router";

export function useRegister() {
  const toast = useToast();

  return useMutation({
    mutationFn: register,

    onSuccess: async () => {
      toast.success("Account created", "You can now login to continue.");
      router.replace("/login");
    },

    onError: (error: any) => {
      const errorMessage =
        error.message || "An error occurred during registration.";
      toast.error("Registration Failed", errorMessage);
    },
  });
}
