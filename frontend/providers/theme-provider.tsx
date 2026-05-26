import { useColorScheme } from "react-native";
import { VariableContextProvider } from "nativewind";

const themes = {
  modern: {
    light: {
      "--color-background": "#F8FAFC",
      "--color-card": "#FFFFFF",
      "--color-border": "#E2E8F0",

      "--color-foreground": "#0F172A",
      "--color-muted-foreground": "#64748B",

      "--color-primary": "#2563EB",
      "--color-primary-foreground": "#FFFFFF",

      "--color-secondary": "#7C3AED",
      "--color-secondary-foreground": "#FFFFFF",

      "--color-accent": "#0EA5E9",
      "--color-success": "#22C55E",
      "--color-danger": "#EF4444",
      "--color-warning": "#F59E0B",

      "--color-input": "#FFFFFF",
      "--color-ring": "#93C5FD",
    },

    dark: {
      "--color-background": "#0F172A",
      "--color-card": "#111827",
      "--color-border": "#1E293B",

      "--color-foreground": "#F8FAFC",
      "--color-muted-foreground": "#94A3B8",

      "--color-primary": "#3B82F6",
      "--color-primary-foreground": "#FFFFFF",

      "--color-secondary": "#8B5CF6",
      "--color-secondary-foreground": "#FFFFFF",

      "--color-accent": "#38BDF8",
      "--color-success": "#22C55E",
      "--color-danger": "#F87171",
      "--color-warning": "#FBBF24",

      "--color-input": "#1E293B",
      "--color-ring": "#2563EB",
    },
  },
};

export function ThemeProvider({
  children,
  name,
}: {
  name: keyof typeof themes;
  children: React.ReactNode;
}) {
  const colorScheme = useColorScheme() ?? "dark";

  return (
    <VariableContextProvider value={themes[name][colorScheme]}>
      {children}
    </VariableContextProvider>
  );
}
