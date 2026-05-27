import { useAuth } from "@/providers/auth-context";
import { Redirect } from "expo-router";

export default function Index() {
  const { status } = useAuth();

  if (status === "authenticated") {
    return <Redirect href="/chats" />;
  }

  return <Redirect href="/login" />;
}
