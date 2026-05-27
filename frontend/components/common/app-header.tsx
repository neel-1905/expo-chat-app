import { Pressable, View } from "react-native";
import React from "react";
import { AppText } from "./app-text";
import { ArrowLeft } from "lucide-react-native";
import { useThemeColor } from "@/hooks/useThemeColor.hook";
import { router } from "expo-router";

export default function AppHeader({ title }: { title: string }) {
  const colors = useThemeColor();

  return (
    <View className="bg-card">
      <View className="flex-row items-center gap-3">
        <Pressable onPress={() => router.back()}>
          <ArrowLeft color={colors.primaryForeground} />
        </Pressable>
        <AppText className="text-lg font-bold">{title}</AppText>
      </View>
    </View>
  );
}
