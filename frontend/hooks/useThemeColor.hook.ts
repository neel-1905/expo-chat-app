import { useColorScheme } from "react-native";
import { themes, ThemeName } from "@/constants/themes";

export function useThemeColor(themeName: ThemeName = "modern") {
  const colorScheme = useColorScheme() ?? "light";
  const theme = themes[themeName][colorScheme];

  return {
    background: theme["--color-background"],
    card: theme["--color-card"],
    border: theme["--color-border"],
    foreground: theme["--color-foreground"],
    mutedForeground: theme["--color-muted-foreground"],
    primary: theme["--color-primary"],
    primaryForeground: theme["--color-primary-foreground"],
    secondary: theme["--color-secondary"],
    secondaryForeground: theme["--color-secondary-foreground"],
    accent: theme["--color-accent"],
    success: theme["--color-success"],
    danger: theme["--color-danger"],
    warning: theme["--color-warning"],
    input: theme["--color-input"],
    ring: theme["--color-ring"],
  };
}
