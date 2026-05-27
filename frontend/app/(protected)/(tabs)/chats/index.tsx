import React from "react";
import { Screen } from "@/components/common/screen";
import AppLogo from "@/components/common/app-logo";
import { SearchInput } from "@/components/ui/search-input";
import { router } from "expo-router";

export default function Chats() {
  return (
    <Screen className="gap-6 text-primary-foreground pt-5!">
      <AppLogo />
      {/* <AppText className="text-lg font-semibold">All Chats</AppText> */}

      <SearchInput
        placeholder="Search chats..."
        onPress={() => router.push("/search/chats")}
        value=""
      />
    </Screen>
  );
}
