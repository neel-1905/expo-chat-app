import { Stack } from "expo-router";
import "../global.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider name="modern">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
