import { useAuthStore } from "@/features/auth/store/auth-store";
import { Redirect } from "expo-router";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/chats" />;
  }

  return <Redirect href="/login" />;
}
