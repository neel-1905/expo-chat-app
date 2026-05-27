import React from "react";
import { Screen } from "@/components/common/screen";
import { View } from "react-native";
import AppLogo from "@/components/common/app-logo";
import { AppText } from "@/components/common/app-text";
import RegisterForm from "@/features/auth/ui/register-form";

export default function Register() {
  return (
    <Screen className="gap-6 text-primary-foreground">
      <View className="gap-8">
        {/* Logo */}
        <AppLogo />

        <View className="gap-2">
          <AppText className="text-2xl">Create an account</AppText>
          <AppText className="text-base text-muted-foreground">
            Join Messenger to start chatting with your friends.
          </AppText>
        </View>

        <RegisterForm />
      </View>
    </Screen>
  );
}
