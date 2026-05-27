import React from "react";
import { Screen } from "@/components/common/screen";
import { AppText } from "@/components/common/app-text";
import AppHeader from "@/components/common/app-header";
import { SearchInput } from "@/components/ui/search-input";

export default function SearchChats() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Screen className="gap-8">
      <AppHeader title="Search Chats" />

      <SearchInput
        autoFocus
        placeholder="Search chats..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <AppText>Chats</AppText>
    </Screen>
  );
}
