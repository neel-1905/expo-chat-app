import React from "react";
import { Screen } from "@/components/common/screen";
import { View } from "react-native";
import AppLogo from "@/components/common/app-logo";
import { AppText } from "@/components/common/app-text";
import LoginForm from "@/features/auth/ui/login-form";

export default function Login() {
  return (
    <Screen className="gap-6 text-primary-foreground">
      <View className="gap-8">
        {/* Logo */}
        <AppLogo />

        <View className="gap-2">
          <AppText className="text-2xl">Welcome back</AppText>
          <AppText className="text-base text-muted-foreground">
            Sign in to your account to continue your conversations.
          </AppText>
        </View>

        <LoginForm />
      </View>
    </Screen>
  );
}
