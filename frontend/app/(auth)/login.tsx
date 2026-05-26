import { View, Text, Button } from "react-native";
import React from "react";
import { Screen } from "@/components/common/screen";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { router } from "expo-router";
import { saveRefreshToken } from "@/features/auth/services/auth-storage";

export default function Login() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const user = useAuthStore((state) => state.user);

  return (
    <Screen className="items-center justify-center gap-4">
      <Text className="text-2xl font-bold">Login</Text>

      <Button
        title="Fake Login"
        onPress={async () => {
          setAuth({
            user: {
              id: "1",
              username: "neel",
              email: "test@test.com",
            },
            accessToken: "token",
          });

          await saveRefreshToken("refresh-token");

          router.replace("/chats");
        }}
      />

      <Text>{user?.email}</Text>
    </Screen>
  );
}
