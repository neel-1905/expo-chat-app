import { View, Text } from "react-native";
import React from "react";
import { useEffect } from "react";

import { getRefreshToken } from "@/features/auth/services/auth-storage";
import { AppButton } from "@/components/ui/app-button";
import { useLogout } from "@/features/auth/hooks/useLogout.hook";

export default function Chats() {
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null);
  const { mutate: handleLogout, isPending } = useLogout();

  useEffect(() => {
    async function test() {
      const token = await getRefreshToken();

      setRefreshToken(token);
    }

    test();
  }, []);

  return (
    <View>
      <Text>Chats</Text>
      <Text>Refresh Token: {refreshToken}</Text>

      <AppButton
        variant="destructive"
        onPress={() => handleLogout()}
        disabled={isPending}
        loading={isPending}
      >
        Logout
      </AppButton>
    </View>
  );
}
