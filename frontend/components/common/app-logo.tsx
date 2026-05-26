import { View, Text } from "react-native";
import React from "react";
import { MessageSquareText } from "lucide-react-native";
import { AppText } from "@/components/common/app-text";

export default function AppLogo() {
  return (
    <View className="flex-row gap-3 items-center">
      <View className="p-2.5 bg-primary rounded-xl">
        <MessageSquareText color={"#FFFFFF"} />
      </View>
      <AppText className="text-2xl font-bold text-primary">Messenger</AppText>
    </View>
  );
}
