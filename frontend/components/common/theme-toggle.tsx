import { Appearance, Pressable, Text } from "react-native";

function ThemeToggle() {
  const toggleTheme = () => {
    Appearance.setColorScheme(
      Appearance.getColorScheme() === "dark" ? "light" : "dark",
    );
  };

  return (
    <Pressable onPress={toggleTheme} className="p-4 bg-background">
      <Text className="text-foreground">Toggle Theme</Text>
    </Pressable>
  );
}

export default ThemeToggle;
