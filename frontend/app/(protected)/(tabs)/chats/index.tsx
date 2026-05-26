import { View, Text } from "react-native";
import React from "react";
import { useEffect } from "react";

import { getRefreshToken } from "@/features/auth/services/auth-storage";

export default function Chats() {
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null);

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
    </View>
  );
}
