import { Stack } from "expo-router";
import "../global.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <ThemeProvider name="modern">
      <View className="flex-1 bg-background">
        <Stack />
      </View>
    </ThemeProvider>
  );
}
