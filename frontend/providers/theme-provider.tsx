import { useColorScheme } from "react-native";
import { VariableContextProvider } from "nativewind";
import { themes } from "@/constants/themes";

export function ThemeProvider({
  children,
  name,
}: {
  name: keyof typeof themes;
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <VariableContextProvider value={themes[name][colorScheme]}>
      {children}
    </VariableContextProvider>
  );
}
