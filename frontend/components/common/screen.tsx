import { SafeAreaView } from "react-native-safe-area-context";

import { ViewProps } from "react-native";

export function Screen({
  children,
  className,
}: ViewProps & {
  className?: string;
}) {
  return (
    <SafeAreaView className={`flex-1 bg-background ${className ?? ""}`}>
      {children}
    </SafeAreaView>
  );
}
